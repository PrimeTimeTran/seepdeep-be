# Audit Local Network

## Check your machine for open ports(vulnerabilities)

$ nmap localhost

## Find the process id(PID) of the service that opened that port

$ lsof -i TCP:9100

## Kill process

$ kill -9 1406     