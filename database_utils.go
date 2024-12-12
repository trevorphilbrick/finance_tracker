package main

import (
	"database/sql"
	"log"
)

func createDatabase() {
	db := openDatabase()
	defer db.Close()

	categoryQuery := `
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);
	`
	if _, err := db.Exec(categoryQuery); err != nil {
		log.Fatal("Error creating categories table:", err)
	}

	expenseQuery := `
	CREATE TABLE IF NOT EXISTS expenses (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			category_id INTEGER NOT NULL,
			description TEXT,
			amount REAL NOT NULL,
			date TEXT DEFAULT CURRENT_DATE,
			FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
		);
	`
	if _, err := db.Exec(expenseQuery); err != nil {
		log.Fatal("Error creating expenses table:", err)
	}
}

func openDatabase() (db *sql.DB) {
	db, err := sql.Open("sqlite", "./finance_tracker.db")

	if err != nil {
		log.Fatal(err)
	}

	return

}
