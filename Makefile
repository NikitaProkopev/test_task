up-front:
	cd ./frontend && npm i
	cd ./frontend && ng serve
up-back:
	cd ./backend && npm i
	cd ./backend && npm start
up-back-dev:
	npm install nodemon -g
	cd ./backend && npm i
	cd ./backend && npm run-script start:dev
build-front:
	cd ./frontend && npm i
	cd ./frontend && ng serve
