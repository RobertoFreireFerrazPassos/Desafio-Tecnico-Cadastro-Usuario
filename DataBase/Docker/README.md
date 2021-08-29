# Index.js Node
1 - Run command 'node index.js' to run index.js

# Docker

reference: https://blog.logrocket.com/docker-sql-server/
or video : https://www.youtube.com/watch?v=RAE-VcZ3u2A&t=151s

1 - Make sure to have Docker running in your local machine for linux container
run command "docker-compose ps" to verify that.

2 -  Run command "docker-compose up -d" 
to download the mssql server image on linux and create the container and run

3 - Run command "docker-compose down"
to remove container

4 - Run command "docker-compose ps" again
you will see this:
Name   Command   State   Ports
------------------------------

5 - Run command "docker-compose up -d" and "docker-compose ps" once again
you will see this:
    Name                   Command               State    Ports
---------------------------------------------------------------
sql-server-db   /opt/mssql/bin/nonroot_msg ...   Exit 1

6 - run command 'docker exec -it sql-server-db "bash"'
it will open the bash on linux inside Docker

7 - run ls to see list of folders

8 - run "/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P change_this_password" to enter in sql commands

9 run 'select name from sys.Databases;' press enter, next line and type go

10 type 'control+C' and type after 'exit' to leave the linux bash