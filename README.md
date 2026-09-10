# Fullstack Capstone Project — Submission Guide

Ye poora code ready hai. Neeche har Task (1–18) ke liye EXACT commands hain jo
tumhe khud apne terminal, GitHub account, MongoDB Atlas account, aur deployment
account (Render/Vercel) se run karne hain — kyunke ye tumhare apne credentials
aur URLs maangte hain, jo sirf tum generate kar sakti ho.

---

## Setup (ek baar)

```bash
# 1. GitHub par ek naya PUBLIC repo banao naam se: fullstack-capstone-project
# GitHub.com > New repository > Name: fullstack-capstone-project > Public > Create

# 2. Is folder ko us repo se connect karo
cd fullstack-capstone-project
git init
git remote add origin https://github.com/<your-username>/fullstack-capstone-project.git
git add .
git commit -m "Initial commit: fullstack capstone project"
git branch -M main
git push -u origin main
```

## MongoDB Atlas Setup

1. https://cloud.mongodb.com par free cluster banao
2. Database Access > Add New Database User (username/password)
3. Network Access > Allow access from anywhere (0.0.0.0/0)
4. "Connect" > "Drivers" se apna connection string copy karo
5. `backend/.env.example` ko `backend/.env` bana lo aur `MONGO_URL` fill karo

---

## Task 1 — user-story.md URL
```bash
# Already pushed. URL banega:
https://github.com/<your-username>/fullstack-capstone-project/blob/main/user-story.md
```

## Task 2 — userstories.png (GitHub Issues screenshot)
1. Apne repo me "Issues" tab kholo
2. Kam az kam 8 issues banao, har ek ko label do: `new`, `icebox`, `technical debt`, ya `backlog`
3. Screenshot lo jisme repo name "fullstack-capstone-project" aur saari issues dikhein
4. File ko `userstories.png` naam do aur upload karo

## Task 3 — MongoDB import (16 documents)
```bash
cd backend
mongoimport --uri "<your-mongo-connection-string>" \
  --collection gifts --db giftdb --file data/gifts.json --jsonArray
```
Terminal output kuch aisa aayega — wahi copy-paste karna hai:
```
2024-XX-XXT00:00:00.000+0000    connected to: mongodb+srv://...
2024-XX-XXT00:00:00.000+0000    16 document(s) imported successfully. 0 document(s) failed to import.
```

## Task 4 — db.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/db.js
```

## Task 5 — giftRoutes.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/routes/giftRoutes.js
```

## Task 6 — searchRoutes.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/routes/searchRoutes.js
```

## Task 7 — app.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/app.js
```

## Task 8 — sentiment/index.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/sentiment/index.js
```

## Task 9 — RegisterPage.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/frontend/src/pages/RegisterPage.js
```

## Task 10 — LoginPage.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/frontend/src/pages/LoginPage.js
```

## Task 11 — authRoutes.js URL
```
https://github.com/<your-username>/fullstack-capstone-project/blob/main/backend/routes/authRoutes.js
```

## Task 12 — deployed_landingpage.png
1. Backend deploy karo Render.com par (free tier): New Web Service > apna repo connect karo > Root Directory: `backend` > Build: `npm install` > Start: `npm start` > Environment Variables me `MONGO_URL` aur `JWT_SECRET` add karo
2. Frontend deploy karo Vercel/Render Static Site par: Root Directory: `frontend` > Build: `npm run build` > Publish dir: `build` > Environment Variable: `REACT_APP_API_URL` = tumhara backend URL
3. Deployed frontend URL kholo, screenshot lo jisme address bar me deployment URL, "GiftNest" title, tagline, aur "Get Started" button dikhein
4. File ko `deployed_landingpage.png` naam do

## Task 13 — mainpage (GET /api/gifts)
```bash
curl -X GET https://<your-backend-url>/api/gifts
```

## Task 14 — register
```bash
curl -X POST https://<your-backend-url>/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Fatima","lastName":"Khan","email":"fatima@example.com","password":"Test1234"}'
```

## Task 15 — login
```bash
curl -X POST https://<your-backend-url>/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fatima@example.com","password":"Test1234"}'
```

## Task 16 — item_detail (GET /api/gifts/:id)
```bash
# Pehle Task 13 ke response se ek id copy karo, phir:
curl -X GET https://<your-backend-url>/api/gifts/<item-id>
```

## Task 17 — search_item (GET /api/search)
```bash
curl -X GET "https://<your-backend-url>/api/search?category=Electronics"
```

## Task 18 — CI/CD terminal output
1. `.github/workflows/ci.yml` already repo me hai
2. Jab tum `git push` karo, GitHub repo > "Actions" tab me workflow chalega
3. Workflow complete hone ke baad, har step (checkout, setup-node, install, test, build) ka output "Actions" tab se copy karo

---

## Local testing (optional, submission se pehle verify karne ke liye)
```bash
cd backend
npm install
npm start
# Naye terminal me:
cd frontend
npm install
npm start
```
