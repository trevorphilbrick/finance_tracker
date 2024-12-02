package main

import (
	"database/sql"
	"log"
)

func createDatabase() {
	db := openDatabase()

	query := `
		CREATE TABLE IF NOT EXISTS categories (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL UNIQUE
		);
		CREATE TABLE IF NOT EXISTS sqlite_sequence(name,seq);
	CREATE TABLE IF NOT EXISTS expenses (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			category_id INTEGER NOT NULL,
			description TEXT,
			amount REAL NOT NULL,
			date TEXT DEFAULT CURRENT_DATE,
			FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
		);
	`
	db.Exec(query)
}

func openDatabase() (db *sql.DB) {
	db, err := sql.Open("sqlite", "./finance_tracker.db")

	if err != nil {
		log.Fatal(err)
	}

	return

}
