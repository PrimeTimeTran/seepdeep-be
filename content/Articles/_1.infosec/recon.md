# Recon
A writeup of the following [video](https://www.youtube.com/watch?v=4VeNLlz4kOA&ab_channel=TacRavenCyberAcademy).

- [] Must know how to evaluate the system
- [] Must know how to evaluate the system

## Active vs Passive

Active:
- Scanning ports
- Attempting to connect to open ports
- Sending special packages
- "Knocking on doors to see who's on"

Passive:
- Public databases
- Read target website
- Gather info from public places
- "Watch house from across street"

## What is Recon?
How to think about recon in ethical hacking? How is it different from the other parts such as understanding pointers, tooling, etc.

### Info Gathering
Collect as much info as possible. Can be both active or passive
- Domain names, IP addresses, Employee information... Snooping; holistic understanding of target. 

### Scanning
- Magnifying class 
- Examine more closely
- Use probes 
  - Scan ports
  - "Checking for open windows"

### Enumeration
Diving deeper. More specific info about network resources

- User names
- Group info
- System roles
- "Finding hidden clues"


### Vulnerability Identification
Good inf

- Look to disrupt
- Documenting everything
- Organize roadmap for future exploits
- Can identify weak spots in fortress


## Info Gathering

### DNS Queries

- Phone book of internet
- Domain names to IP addresses
- Treasure trove of data
- IPs, mail servers, subdomains
- Understanding infrastructure
- Identify entry points


### Network Mapping

- Servers, routers, firewalls
- Types of devices, functions, how they communicate
- Discovering & visualizing devices & how they interact


### Social Engineering

- Be responsible
- Open source info
- Manipulating people to divulge value info
- Passwords, usernames, details about company


### WHOis Queries

- Registered owner
- Contact info
- Expiration date
- Know about the target

## Scanning and Vulnerability Identification
We've gather the essential info. Time to actively engage. Knock on the door to see who's in. Don't break in, look for open doors

### Tools

- NMap: Identify ports, operating systems, firewall types, etc.
- NMap

### Vulnerabilities
- Gaps
- Weak password
- Software bug()
- Nessus: 
  - Vulnerability scanner
  - Robustness
  - Extensive vulnerability db
- OpenVAS
  - Open vul accessibility system

Can tell us some stuff but not all. We have to analyze results of the tools. They can identify but they cannot tell us how critical or how they can be exploited. Must determine which vul is most critical and how we might exploit them.

Some related to business logic or design flaws are discovered by manual testing & analysis.

Automated tools can miss vulnerabilities. 

Deep understanding of network systems, coding, and understanding human behavior.

### Importance of Reconnaissance in Ethical Hacking
It's about understanding the targets environment, potential risk, and how to approach them.

- Scout for everything else
- Don't go through a maze in the dark!
- Map of the digital landscape
- Understand target inside & out
- Groundwork for successful missions
- Informs the warrior about weak points.
  - Saves time & resources
  - Focus efforts where you're most likely to succeed.
  - Must know where cameras are, when guards are working, their change time, etc.

## Recap and Conclusion
Initial crucial phase. Collecting as much info as possible. Laying foundation for next steps.