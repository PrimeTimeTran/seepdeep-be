Run the following
$ ip addr show

Look for a line that says "inet" for IPv4

$ nmap -sT -p 80,443,3005,3000 10.0.0.243

Stealthy scan(syn scan, half scan, not full open scan)
$ nmap -sS -p 80,443,3005,3000 10.0.0.243