package config

import "sync"

type config struct {
	DBconn string
	Port   string
	Jwt    string
	Mu     sync.Mutex
}
