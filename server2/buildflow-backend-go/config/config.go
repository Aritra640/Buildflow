package config

import "sync"

type config struct {
	DBconn string
	Mu     sync.Mutex
}
