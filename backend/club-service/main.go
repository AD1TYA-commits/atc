package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

type User struct {
	Email        string `json:"bennett_email"`
	Username     string `json:"username"`
	AcademicYear string `json:"academic_year"`
	Role         string `json:"role"`
}

func main() {
	db, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(r.Context(),
			"SELECT bennett_email, username, academic_year, role FROM users")
		if err != nil {
			http.Error(w, "Database error", 500)
			return
		}
		defer rows.Close()

		var users []User

		for rows.Next() {
			var u User
			if err := rows.Scan(&u.Email, &u.Username, &u.AcademicYear, &u.Role); err != nil {
				http.Error(w, "Query error", 500)
				return
			}
			users = append(users, u)
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(users)
	})

	log.Println("Club service: localhost:8082")
	log.Fatal(http.ListenAndServe(":8082", nil))
}
