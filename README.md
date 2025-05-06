lancer 4 terminaux :

1er terminal : 

```
cd api-gateway
npm install
node index.js
```

2ème terminal : 

```
cd user-service
npm install
node index.js
```

3ème terminal : 

```
cd publication-service
npm install
node index.js
```

4ème terminal : 

```
cd frontend
npm install
npm start
```

il existe 6 endpoints :
- /login
- /register
- / <-- liste des publications
- /publication/:id
- /publication/create
- /publication/edit/:id