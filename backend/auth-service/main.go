
package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

func main() {
	db, err := pgxpool.New(context.Background(), os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query(r.Context(),
			"SELECT bennett_email, password_hash FROM login")
		if err != nil {
			http.Error(w, "Database error", 500)
			return
		}
		defer rows.Close()

		var result []map[string]string

		for rows.Next() {
			var email, passwordHash string
			if err := rows.Scan(&email, &passwordHash); err != nil {
				http.Error(w, "Query error", 500)
				return
			}

			result = append(result, map[string]string{
				"bennett_email": email,
				"password_hash": passwordHash,
			})
		}

		json.NewEncoder(w).Encode(result)
	})

	log.Println("Auth service: localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
