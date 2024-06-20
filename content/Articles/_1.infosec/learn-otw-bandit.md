---
title: 'Over The Wire - Bandit'
date: '2022-11-02'
tags: ['Infosec', 'Linux']
draft: false
summary: "Walkthrough of each level of Over the Wire's Bandit series. Its a CLI game which helps players master Linux, SSH, and much more."
layout: PostSimple
bibliography: references-data.bib
---

## Intro - Over the Wire Bandit

A walkthrough of [Over the Wire Bandit](https://overthewire.org/wargames/bandit/).

Bandit is a war game is aimed at absolute beginners.

This series of challenges helped me review fundamentals of Linux, Bash,
file system, net cat, cronjobs and more.

For each challenge we SSH into a remote server and must find a hidden PW somewhere
on the file system.

Each password grants access to the next server/challenge.

## [Level 0](https://overthewire.org/wargames/bandit/bandit0.html) - SSH to remote machine

How to SSH into a remote machine?

Use your CLI & [SSH](https://www.cloudflare.com/learning/access-management/what-is-ssh/#:~:text=the%20private%20network.-,Using%20SSH,and%20directly%20enter%20SSH%20commands.).

```sh
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Password is given in the instructions.

```sh
bandit0
```

Copy the password inside of the readme.

```sh
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

## [Level 1](https://overthewire.org/wargames/bandit/bandit1.html) - How to handle dash file names

The password for the next level is stored in a file called `-` located in the home
directory

```sh
ssh bandit1@bandit.labs.overthewire.org -p 2220
```

Use `cat` with an absolute or relative path `cat /home/bandit1` and `cat ./-` respectively.

```sh
cat /home/bandit1/-
# or
cat ./-
```

> The dash char, `-`, is a special character which'll mess up reading the filename using `cat`. So we must use more verbose syntax.

## [Level 2](https://overthewire.org/wargames/bandit/bandit3.html) - How to handle spaces in file names

The password for the next level is stored in a file called spaces in this filename
located in the home directory

```sh
ssh bandit2@bandit.labs.overthewire.org -p 2220
```

```sh
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

Use escape character `\` before spaces in file names.

```sh
cat ./spaces\ in\ this\ filename
```

> We must escape characters to escape the spaces on Linux OSs.

## [Level 3](https://overthewire.org/wargames/bandit/bandit4.html) - How to view hidden files

The password for the next level is stored in the only human-readable file in the
inhere directory. Tip: if your terminal is messed up, try the “reset” command.

```sh
ssh bandit3@bandit.labs.overthewire.org -p 2220
```

```sh
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

Use `ls` with `-al` flags to include hidden files in output.

```sh
ls -al
```

> In Linux, hidden files are prefixed with a `.` character. We can reveal them using `ls -al`.

## [Level 4](https://overthewire.org/wargames/bandit/bandit5.html) - How to identify human readable files

Identify ASCII text files using `file` command.

```sh
ssh bandit4@bandit.labs.overthewire.org -p 2220
```

```sh
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

```sh
file ./-file*
```

> The file command shows the files data storage type. Because we have many files we can see the types of many similarly prefixed files by using `file ./-file`, the prefix, a `*` the wildcard.

Use file command to identify file types.

## [Level 5](https://overthewire.org/wargames/bandit/bandit6.html) - Search for files matching criteria/flags

The password for the next level is stored in a file somewhere under the inhere
directory and has all of the following properties:

```sh
ssh bandit5@bandit.labs.overthewire.org -p 2220
```

```sh
lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR
```

Search a path for file meeting parameters. After finding the file then cat it.

```sh
find ./ -type f -size 1033c ! -executable
```

> Searching for just human readable reveals many results. Add additional cli arg to search on size as well. Lastly the `!` and `-executable` specifies that we want a file that isn't executable.

## [Level 6](https://overthewire.org/wargames/bandit/bandit7.html) - Search for files belonging to a specific user and group

```sh
ssh bandit6@bandit.labs.overthewire.org -p 2220
```

```sh
P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU
```

Search from root directory for file meeting specific parameters.

Searching from the root dir of the machine, Find files that match user `bandit7`, group `bandit6`, and have a size of `33c` bytes

```sh
find / -user bandit7 -group bandit6 -size 33c
```

Looking at the results we find file which we have permissions to access.

View it's content for the password to the next level

```sh
cat /var/lib/dpkg/info/bandit7.password
```

## [Level 7](https://overthewire.org/wargames/bandit/bandit8.html) - Find specific text in a file

```sh
ssh bandit7@bandit.labs.overthewire.org -p 2220
```

```sh
z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S
```

Using `grep` we can find lines containing specific strings.

Include line numbers with `-n`.

```sh
grep -n millionth data.txt
```

> There's many linux commands to learn. `cat` views a file whereas `grep` searches it.

Some other ones of note are `man, grep, sort, uniq, strings, base64, tr, tar, gzip, bzip2, xxd`

## [Level 8](https://overthewire.org/wargames/bandit/bandit9.html) - How to organize/filter lines in a long file

The password for the next level is stored in the file data.txt and is the only
line of text that occurs only once

```sh
sshpass -p TESKZC0XvTetK0S9xNwm25STk5iWrBvP ssh -p 2220 bandit8@bandit.labs.overthewire.org
```

Sort the lines lexicographically and only grab unique lines.

```sh
sort data.txt | uniq -u
```

> With `sort` we can find unique lines if we pass the -u flag.

## [Level 9](https://overthewire.org/wargames/bandit/bandit10.html) - How to parse binary data to human readable format

The password for the next level is stored in the file data.txt in one of the few
human-readable strings, preceded by several ‘=’ characters.

```sh
sshpass -p EN632PlfYiZbn3PhVK3XOGSlNInNE00t ssh -p 2220 bandit9@bandit.labs.overthewire.org 
```

Use strings to print the sequence of printable characters in files.

```sh
cat data.txt | strings -e s | grep ==
```

It's a binary file. Although the term is misleading. It can refer to any file that contains data in a format other than plain text, hexidecimal for example.

So, in summary, binary files can indeed contain data encoded in binary (0s and 1s) or represented in hexadecimal format, among other possibilities.

## [Level 10](https://overthewire.org/wargames/bandit/bandit11.html) - How to decode from base64

The password for the next level is stored in the file data.txt, which contains
base64 encoded data

```sh
sshpass -p G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s ssh -p 2220 bandit10@bandit.labs.overthewire.org 
```

Using `cat` it's clearly not plain text. From experience we know it's not binary or hex... Could it be base64?

```sh
cat data.txt | base64 -d
```

> Piping the result of `cat` to `base64` and decoding it, `-d`, reveals the plain text we need.

## [Level 11](https://overthewire.org/wargames/bandit/bandit12.html) - How to translate file output using TR command

The password for the next level is stored in the file data.txt, where all lowercase
(a-z) and uppercase (A-Z) letters have been rotated by 13 positions

```sh
sshpass -p 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM ssh -p 2220 bandit11@bandit.labs.overthewire.org 
```

Pipe the result of `cat` to `tr`. Specify the transformation to be done using it's domain specific language.

```sh
cat data.txt | tr "A-Za-z" "N-ZA-Mn-za-m"
```

## [Level 12](https://overthewire.org/wargames/bandit/bandit13.html) - How to investigate contents of binary files

The password for the next level is stored in the file data.txt, which is a hexdump
of a file that has been repeatedly compressed. For this level it may be useful to
create a directory under /tmp in which you can work using mkdir. For example:
mkdir /tmp/myname123. Then copy the datafile using cp, and rename it using mv
(read the manpages!)

```sh
sshpass -p JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv ssh -p 2220 bandit12@bandit.labs.overthewire.org 
```

We can't write to anywhere in the file system. We can write to `/tmp` though...

```sh
mkdir -p /tmp/workhere && cp data.txt /tmp/workhere && cd /tmp/workhere
```

Create dir inside `tmp` for our output, copy `data.txt` over, and move into that dir.

```sh
cat data.txt | xxd -r > data
```


Use `xxd` to reverse hex dump. It's now some kind of binary.

The hex dump is in `data`. How can you determine whats inside of data...? The `file` command.

```sh
file data
gzip compressed data, was "data2.bin", last modified: Thu Oct  5 06:19:20 2023, max compression, from Unix, original size modulo 2^32 573
```

By using file we identify it's a `gzip` compressed file. So we change the extension to `.gz` so that we can unzip and then unzip it.


Switch it to a GNU zip file/compression algorithm.

Use `gzip` to unzip/decompress the file. Then use `file` to check the information of data2 again.

```sh
mv data data2.gz
gzip -d data2.gz
file data2
data2: bzip2 compressed data, block size = 900k
```

Unziping, checking file content reads bzip2 compressed data. Unzip it to figure out whats inside of it.

```sh
mv data2 data3.bz
bzip2 -d data3.bz
file data3
gzip compressed data, was "data4.bin", last modified: Thu Oct  5 06:19:20 2023, max compression, from Unix, original size modulo 2^32 20480
```

```sh
mv data3 data4.gz
gzip -d data4.gz
file data4
data4: POSIX tar archive (GNU)
```

```sh
mv data4 data5.tar
tar -xf data5.tar
file data5.bin
POSIX tar archive (GNU)
```

We see it's still a tar file so we manipulate it again

```sh
mv data5.bin data6.tar
tar -xf data6.tar
file data6.bin
bzip2 compressed data, block size = 900k
```

Finally we escaped the tar archive format.

```sh
mv data6.bin data7.bz
bzip2 -d data7.bz
file data7
POSIX tar archive (GNU)
```

We've back to tar archive, so we once again do tar archive 

```sh
mv data7 data8.tar
tar -xf data8.tar
file data8.bin
gzip compressed data, was "data9.bin", last modified: Thu Oct  5 06:19:20 2023, max compression, from Unix, original size modulo 2^32 49
```

We see it's a `gzip` so we change extension to unzip.

```sh
mv data8.bin data9.gz
gzip -d data9.gz
file data9
ASCII text
```

Finally we have ASCII text.

Essentially the files were compressed/encoded through this flow.

`hex > gzip > bzip2 > gzip > tar > tar > bzip2 > tar > gzip > ascii`

## [Level 13](https://overthewire.org/wargames/bandit/bandit14.html) - How to use a private key to ssh into a remote machine

<!-- Turbo: -->

The password for the next level is stored in /etc/bandit_pass/bandit14 and can
only be read by user bandit14. For this level, you don’t get the next password,
but you get a private SSH key that can be used to log into the next level. Note:
localhost is a hostname that refers to the machine you are working on

```sh
sshpass -p wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw ssh -p 2220  bandit13@bandit.labs.overthewire.org
```
Use private key on bandit13 to ssh into bandit14.

```sh
ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

Check the file in this machine.

```sh
cat /etc/bandit_pass/bandit14
```

## [Level 14](https://overthewire.org/wargames/bandit/bandit15.html) - Use NC to send messages to local http server

The password for the next level can be retrieved by submitting the password of
the current level to port 30000 on localhost.

```sh
sshpass -p fGrHPx402xGC7U7rXKDaxiWFTOiF0ENq ssh -p 2220 bandit14@bandit.labs.overthewire.org
```

```sh

```

Echo the password to this level to port 30000 using `nc`

```sh
echo "fGrHPx402xGC7U7rXKDaxiWFTOiF0ENq" | nc localhost 30000
```

## [Level 15](https://overthewire.org/wargames/bandit/bandit16.html) - Use OpenSSL to connect

The password for the next level can be retrieved by submitting the password of the
current level to port 30001 on localhost using SSL encryption.

Helpful note: Getting “HEARTBEATING” and “Read R BLOCK”? Use -ign_eof and read the
“CONNECTED COMMANDS” section in the manpage. Next to ‘R’ and ‘Q’, the ‘B’ command
also works in this version of that command…

```sh
ssh bandit15@bandit.labs.overthewire.org -p 2220
```

```sh
jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
```

Open ssl connection

```sh
openssl s_client -connect localhost:30001
```

Submit password through SSL connection

```sh
jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
```

## [Level 16](https://overthewire.org/wargames/bandit/bandit17.html) - How to check for open ports and create a ssh key

Use nmap to identify open ports and openssl to send them passwords

The credentials for the next level can be retrieved by submitting the password
of the current level to a port on localhost in the range 31000 to 32000. First
find out which of these ports have a server listening on them. Then find out which
of those speak SSL and which don’t. There is only 1 server that will give the
next credentials, the others will simply send back to you whatever you send to it.

After getting the key you should create a bandit.key on local and then chmod it.
Afterwards use the key to ssh into a remote machine for 17

```sh
ssh bandit16@bandit.labs.overthewire.org -p 2220
```

```sh
JQttfApK4SeyHwDlI9SXGR50qclOAil1
```

Use `nmap` to identify open ports.

```sh
nmap -p 31000-32000 localhost
```

```sh
cat /etc/bandit_pass/bandit16 | openssl s_client -connect localhost:31046 -quiet
cat /etc/bandit_pass/bandit16 | openssl s_client -connect localhost:31518 -quiet
cat /etc/bandit_pass/bandit16 | openssl s_client -connect localhost:31691 -quiet
cat /etc/bandit_pass/bandit16 | openssl s_client -connect localhost:31790 -quiet
cat /etc/bandit_pass/bandit16 | openssl s_client -connect localhost:31960 -quiet
```

```sh
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJ
imZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQ
Ja6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTu
DSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbW
JGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNX
x0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvD
KHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBl
J9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovd
d8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nC
YNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8A
vLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama
+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT
8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnx
SatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHd
HCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+Exdvt
SghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0A
R57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDi
Ttiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCg
R8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiu
L8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Ni
blh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkU
YOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM
77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0b
dxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3
vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=
-----END RSA PRIVATE KEY-----
```

Save key to a local file named

```sh
bandit.key
```

Use `chmod 400` to give user read permission and remove all other permissions to
bandit.key.

```sh
chmod 400 bandit.key
```

Use the created key to ssh into next level .

```sh
ssh -i bandit.key bandit17@bandit.labs.overthewire.org -p 2220
```

## [Level 17](https://overthewire.org/wargames/bandit/bandit18.html) - How to check for differences in two files

There are 2 files in the homedirectory: passwords.old and passwords.new. The password
for the next level is in passwords.new and is the only line that has been changed
between passwords.old and passwords.new

```sh
diff passwords.new passwords.old
```

## [Level 18](https://overthewire.org/wargames/bandit/bandit19.html) - hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg

The password for the next level is stored in a file readme in the homedirectory.
Unfortunately, someone has modified .bashrc to log you out when you log in with SSH.

```ssh
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat ~/readme"
```

```sh
hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg
```

SSH in and invoke command immediately.

```sh
ssh bandit18@bandit.labs.overthewire.org -p 2220 "cat ~/readme"
```

## [Level 19](https://overthewire.org/wargames/bandit/bandit20.html) - Use a binary to access a file as a different user

To gain access to the next level, you should use the setuid binary in the homedirectory.
Execute it without arguments to find out how to use it. The password for this
level can be found in the usual place (/etc/bandit_pass), after you have used the
setuid binary.

```ssh
ssh bandit19@bandit.labs.overthewire.org -p 2220
```

```sh
awhqfNnAbc1naukrpqDYcF95h7HoMTrC
```

Use another user's permissions to run an executable.

Use the binary to run commands on other files as bandit20.

```sh
ls -al ./bandit20-do
./bandit20-do
./bandit20-do id
ls /etc/bandit_pass/bandit*
ls /etc/bandit_pass/bandit20
cat /etc/bandit_pass/bandit20
./bandit20-do cat /etc/bandit_pass/bandit20
```

## [Level 20](https://overthewire.org/wargames/bandit/bandit21.html) - VxCazJaVykI6W36BkBU0mJTCM8rR95XT

There is a set uid binary in the home directory that does the following: it makes
a connection to localhost on the port you specify as a commandline argument. It
then reads a line of text from the connection and compares it to the password in
the previous level (bandit20). If the password is correct, it will transmit the
password for the next level (bandit21).

```sh
ssh bandit20@bandit.labs.overthewire.org -p 2220
```

```sh
VxCazJaVykI6W36BkBU0mJTCM8rR95XT
```

Two techniques, one using 2 socket connections.

1. Set up an nc listener on one terminal.

```sh
nc -lp 6000
```

2. Connect to listening port

```sh
./suconnect 6000
```

3. Enter password in original nc port listener and watch pw
   get spit out of other terminal.

```sh
VxCazJaVykI6W36BkBU0mJTCM8rR95XT
```

Start background process

```sh
echo -n 'VxCazJaVykI6W36BkBU0mJTCM8rR95XT' | nc -l -p 1234 &
```

Now try to connect to background process.

```sh
./suconnect 1234
```

## [Level 21](https://overthewire.org/wargames/bandit/bandit22.html) - Find password inside of cron job

A program is running automatically at regular intervals from cron, the time-based
job scheduler. Look in /etc/cron.d/ for the configuration and see what command
is being executed.

```ssh
ssh bandit21@bandit.labs.overthewire.org -p 2220
```

```sh
NvEJF7oVjkddltPSrdKEFOllh9V1IBcq
```

Checkout the directory where cron jobs are saved.

The cronjob for bandit22 runs a bash script which redirects the output to be thrown away.

```sh
cd /etc/cron.d
cat cronjob_bandit22
```

The bash script will create a file that can be rw by owner and r by group and others.
We copy the contents of etc to that tmp file.

```sh
cat /usr/bin/cronjob_bandit22.sh
cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv
```

## [Level 22](https://overthewire.org/wargames/bandit/bandit23.html) - How to set variables in bash?

A program is running automatically at regular intervals from cron, the time-based job scheduler. Look in /etc/cron.d/ for the configuration and see what command is being executed.

NOTE: Looking at shell scripts written by other people is a very useful skill. The script for this level is intentionally made easy to read. If you are having problems understanding what it does, try executing it to see the debug information it prints.

```ssh
ssh bandit22@bandit.labs.overthewire.org -p 2220
```

```sh
WdDozAdTM2z9DiFEQ2mGlwngMfj4EZff
```

```sh
cat /usr/bin/cronjob_bandit23.sh
/usr/bin/cronjob_bandit23.sh
```

```bash
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/$myname > /tmp/$mytarget
```

From the script, we know that the password for next level stored in the file named
with $mytarget which is defined above as a md5sum. And we need to set $myname to bandit23 to fetch the correct filename.

```sh
myname=bandit23
echo I am user $myname | md5sum | cut -d ' ' -f 1
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

We define a variable then use it to

## [Level 23](https://overthewire.org/wargames/bandit/bandit24.html) - Create a script

A program is running automatically at regular intervals from cron, the time-based
job scheduler. Look in /etc/cron.d/ for the configuration and see what command is
being executed.

NOTE: This level requires you to create your own first shell-script. This is a
very big step and you should be proud of yourself when you beat this level!

NOTE 2: Keep in mind that your shell script is removed once executed, so you may
want to keep a copy around…

```ssh
ssh bandit23@bandit.labs.overthewire.org -p 2220
```

```sh
QYw0Y2aiA672PsMmh9puTQuhoz8SyR2G
```

```sh
cat /usr/bin/cronjob_bandit24.sh
```

```sh
#!/bin/bash

myname=$(whoami)

cd /var/spool/$myname/foo
echo "Executing and deleting all scripts in /var/spool/$myname/foo:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i
        fi
        rm -f ./$i
    fi
done
```

```sh
mkdir /tmp/rand
cd /tmp/rand
touch script.sh
```

Create a script in the tmp folder which will be ran by the cron job.

```sh
#!/bin/bash
cat /etc/bandit_pass/bandit24 > /tmp/rand/password
```

The script reads out the password from bandit24 and then puts it inside our tmp file.

We do this because we cannot directly access /etc/bandit_pass/bandit24

```sh
cp script.sh /var/spool/bandit24/foo
chmod 777 /tmp/rand
```

Move our script to the dir where the original script will run and change
permissions on the current dir.

## [Level 24](https://overthewire.org/wargames/bandit/bandit25.html) - Loop with bash

A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing.
You do not need to create new connections each time

```ssh
ssh bandit24@bandit.labs.overthewire.org -p 2220
```

```sh
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar
```

```
nc localhost 30002
```

```
mktemp -d
cd /tmp/tmp.3YQNHtW1Uu
nano brute_force_pin.sh
chmod +x brute_force_pin.sh
```

```
#!/bin/bash

for i in {0000..9999}
do
        echo VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar $i >> possibilities.txt
done

cat possibilities.txt | nc localhost 30002 > result.txt
```

Our script will brute force all possible solutions.

## [Level 25](https://overthewire.org/wargames/bandit/bandit26.html) - Change editor modes in order to enter a shell

Logging in to bandit26 from bandit25 should be fairly easy… The shell for user bandit26 is not /bin/bash, but something else. Find out what it is, how it works and how to break out of it.

```ssh
ssh bandit25@bandit.labs.overthewire.org -p 2220
```

```
p7TaowMYrmu23Ol8hiZh9UvD0O9hpx8d
```

```
ssh -i bandit26.sshkey bandit26@localhost -p 2220
```

SSH into bandit25 using the key provided. It will use another shell by default.
We can use the `more` shell with vim mode to read out of it with command.

```
:e /etc/bandit_pass/bandit26
```

## [Level 26](https://overthewire.org/wargames/bandit/bandit27.html) - Use more to get a shell and run a script

Good job getting a shell! Now hurry and grab the password for bandit27!

```ssh
ssh bandit26@bandit.labs.overthewire.org -p 2220
```

```
c7GvcKlw9mC7aUQaPx7nwFstuAIBw1o1

```

```
:set shell=/bin/bash
```

```
:shell
```

```sh
./bandit27-do cat /etc/bandit_pass/bandit27
```

## [Level 27](https://overthewire.org/wargames/bandit/bandit28.html) - Clone repo using ssh connection

There is a git repository at ssh://bandit27-git@localhost/home/bandit27-git/repo.
The password for the user bandit27-git is the same as for the user bandit27.

Clone the repository and find the password for the next level.

```ssh
ssh bandit27@bandit.labs.overthewire.org -p 2220
```

```
YnQpBuifNMas1hcUFk70ZmqkhUU2EuaS
```

Clone repo and read password for the next level. Make sure you add a port.

```ssh
git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
```

## [Level 28](https://overthewire.org/wargames/bandit/bandit29.html) - Find password in previous commit

There is a git repository at ssh://bandit28-git@localhost/home/bandit28-git/repo.
The password for the user bandit28-git is the same as for the user bandit28.

Clone the repository and find the password for the next level.

```ssh
ssh bandit28@bandit.labs.overthewire.org -p 2220
```

```
AVanL161y9rsbcJIsFHuw35rjaOM19nR
```

```
git clone ssh://bandit28-git@localhost:2220/home/bandit28-git/repo
```

```
git checkout COMMIT
```

## [Level 29](https://overthewire.org/wargames/bandit/bandit30.html) - Get pw on different branches

There is a git repository at ssh://bandit29-git@localhost/home/bandit29-git/repo.
The password for the user bandit29-git is the same as for the user bandit29.

Clone the repository and find the password for the next level.

```ssh
ssh bandit29@bandit.labs.overthewire.org -p 2220
```

```
tQKvmcwNYcFS6vmPHIUSI3ShmsrQZK8S
```

```
git clone ssh://bandit29-git@localhost:2220/home/bandit29-git/repo
```

## [Level 30](https://overthewire.org/wargames/bandit/bandit31.html) - Get pw from tags on git

There is a git repository at ssh://bandit30-git@localhost/home/bandit30-git/repo.
The password for the user bandit30-git is the same as for the user bandit30.

Clone the repository and find the password for the next level.

```ssh
ssh bandit30@bandit.labs.overthewire.org -p 2220
```

```
xbhV3HpNGlTIdnjUrdAlPzc2L6y9EOnS
```

```
git clone ssh://bandit30-git@localhost:2220/home/bandit30-git/repo
```

## [Level 31](https://overthewire.org/wargames/bandit/bandit32.html) - Get pw by committing file and pushing to remote.

There is a git repository at ssh://bandit31-git@localhost/home/bandit31-git/repo.
The password for the user bandit31-git is the same as for the user bandit31.

Clone the repository and find the password for the next level.

```ssh
ssh bandit31@bandit.labs.overthewire.org -p 2220
```

```
OoffzGDlzhAlerFJ2cAiz1D41JW1Mhmt
```

```
git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
```

## [Level 32](https://overthewire.org/wargames/bandit/bandit33.html) - Use $0 to reference current shell

After all this git stuff its time for another escape. Good luck!

```ssh
ssh bandit32@bandit.labs.overthewire.org -p 2220
```

```
rmCBvG56y58BXzv98yZGdO7ATVL5dW8y
```

## [Level 33](https://overthewire.org/wargames/bandit/bandit34.html) - Final level

After all this git stuff its time for another escape. Good luck!

```ssh
ssh bandit33@bandit.labs.overthewire.org -p 2220
```

```
odHo63fHiFqcWWJG9rLiLDtPm45KzUKy
```
