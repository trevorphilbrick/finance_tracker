package main

import (
	"database/sql/driver"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	_ "modernc.org/sqlite"
)

type Category struct {
	Name string `json:"name"`
	ID   int    `json:"id"`
}

type Expense struct {
	Category_id int          `json:"category_id"`
	Amount      int          `json:"amount"`
	Description string       `json:"description"`
	Id          int          `json:"id,omitempty"`
	Date        driver.Value `json:"date,omitempty"`
}

// get categories

func getCategories(c *gin.Context) {

	db := openDatabase()

	defer db.Close()

	query := "SELECT * FROM categories"
	rows, err := db.Query(query)

	if err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	defer rows.Close()

	var categories []Category

	for rows.Next() {
		var category Category
		if err := rows.Scan(&category.ID, &category.Name); err != nil {
			c.Error(err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
			return
		}
		categories = append(categories, category)
	}

	c.JSON(http.StatusOK, categories)
}

// create a category

func createCategory(c *gin.Context) {
	db := openDatabase()

	defer db.Close()

	var category Category

	if err := c.ShouldBindJSON(&category); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	stmt, err := db.Prepare("INSERT OR IGNORE INTO categories (name) VALUES (?)")

	if err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	if _, err := stmt.Exec(category.Name); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	query := "SELECT id, name FROM categories WHERE name = ?"
	row := db.QueryRow(query, category.Name)

	var newCategory Category

	if err := row.Scan(&newCategory.ID, &newCategory.Name); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	stmt.Close()

	c.JSON(http.StatusCreated, newCategory)

}

// delete a category

func deleteCategory(c *gin.Context) {
	db := openDatabase()

	defer db.Close()

	name := c.Params.ByName("name")

	// TODO: add cascade delete

	query := "DELETE FROM categories WHERE name = ?;"

	db.QueryRow(query, name)

	c.JSON(http.StatusAccepted, gin.H{"message": "success"})

}

// add expense to category
func createExpense(c *gin.Context) {

	db := openDatabase()

	defer db.Close()

	var expense Expense

	if err := c.ShouldBindJSON(&expense); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	stmt, err := db.Prepare("INSERT INTO expenses (category_id, amount, description) VALUES (?, ?, ?);")

	if err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	if _, err := stmt.Exec(expense.Category_id, expense.Amount, expense.Description); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	// get and return all expenses from that category

	query := "SELECT id, category_id, amount, description, date FROM expenses WHERE category_id = ?;"

	if err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	var expenses []Expense
	rows, err := db.Query(query, expense.Category_id)

	for rows.Next() {
		var expense Expense

		if err := rows.Scan(&expense.Id, &expense.Category_id, &expense.Amount, &expense.Description, &expense.Date); err != nil {
			c.Error(err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})

			return
		}
		expenses = append(expenses, expense)
	}

	c.JSON(http.StatusOK, expenses)
}

// update expense in category

// remove expense from category

func deleteExpense(c *gin.Context) {
	db := openDatabase()

	defer db.Close()

	id := c.Params.ByName("id")

	deleteQuery := "DELETE FROM expenses WHERE id = ?;"

	db.QueryRow(deleteQuery, id)

	c.JSON(http.StatusAccepted, gin.H{"message": "success"})

}

// get category

func getCategory(c *gin.Context) {
	db := openDatabase()

	defer db.Close()

	id := c.Params.ByName("id")

	query := "SELECT category_id,  amount, description, id,  date FROM expenses WHERE category_id = ?;"

	rows, err := db.Query(query, id)

	if err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	var expenses []Expense

	for rows.Next() {
		var expense Expense
		if err := rows.Scan(&expense.Category_id, &expense.Amount, &expense.Description, &expense.Id, &expense.Date); err != nil {
			c.Error(err)
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
			return
		}
		expenses = append(expenses, expense)
	}

	c.JSON(http.StatusOK, expenses)
}

// get expense

func getExpense (c *gin.Context) {
	db := openDatabase()

	defer db.Close()

	id := c.Params.ByName("id")

	query := "SELECT category_id, amount, description, id, date FROM expenses WHERE id = ?;"

	row := db.QueryRow(query, id)

	var expense Expense

	if err := row.Scan(&expense.Category_id, &expense.Amount, &expense.Description, &expense.Id, &expense.Date); err != nil {
		c.Error(err)
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"status": false, "message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, expense)
}

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	createDatabase()

	r.GET("/categories", getCategories)

	r.POST("/category", createCategory)

	r.DELETE("/category/:name", deleteCategory)

	r.POST("/expense", createExpense)

	r.DELETE("/expense/:id", deleteExpense)

	r.GET("/category/:id", getCategory)

	r.GET("/expense/:id", getExpense)


	r.Run()
}
