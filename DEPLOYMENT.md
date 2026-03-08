# Deployment Guide for Task Manager App

This guide walks through deploying the Task Manager backend to Render and connecting your frontend.

## Backend Deployment to Render

### Step 1: Create a Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account (easiest for deployment)

### Step 2: Deploy Backend Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository containing the backend code
3. Fill out the service configuration:
   - **Name**: Something like `task-manager-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Plan**: Free tier is fine for development

4. Click **"Create Web Service"**
5. Render will deploy automatically. Wait for the build to complete (takes ~2 minutes)

### Step 3: Get Your API URL
Once deployed, Render will show your service URL like: `https://task-manager-api-xyz.onrender.com`

This is your production API URL. Copy it—you'll need it next.

---

## Frontend Configuration

### Update api.js for Production

Open `frontend/src/api.js` and change the `API_BASE_URL` constant:

**Development** (running locally):
```javascript
const API_BASE_URL = 'http://localhost:5000';
```

**Production** (using Render):
```javascript
const API_BASE_URL = 'https://task-manager-api-xyz.onrender.com';
```

Replace `task-manager-api-xyz` with your actual Render service name.

---

## Testing the Deployed API

### Quick Test with curl

```bash
# Get all tasks
curl https://your-render-url/api/tasks

# Create a task
curl -X POST https://your-render-url/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","priority":"high"}'
```

If you get a JSON response, your API is working!

### Test in Frontend

1. Update `frontend/src/api.js` with your Render URL
2. Start the frontend dev server: `npm run dev` (from frontend folder)
3. Load the app and try adding a task
4. Check that it creates tasks in the deployed backend

---

## Troubleshooting

**"Cannot connect to API" error:**
- Verify your Render service is running (check Render dashboard)
- Check that the URL in `api.js` matches your Render service URL
- Wait 1-2 minutes after deployment—Render might still be spinning up

**"CORS error":**
- This shouldn't happen since CORS is enabled in the backend
- But if it does, check that the `cors()` middleware is in server.js

**Data disappears after redeploiy:**
- This is expected! The backend uses in-memory storage. Data resets when the service restarts.
- For persistent data, you'd need to add a database (like PostgreSQL on Render or Neon)

---

## Optional: Deploy Frontend Too

To deploy the React frontend to Render as well:

1. Build the frontend: `npm run build` (from frontend folder)
2. Create a new Render **Static Site** with the frontend repo
3. Build command: `npm run build`
4. Publish directory: `dist`

Make sure the frontend's `api.js` has the correct backend URL before deploying.

---

## Summary

| Environment | Backend URL | Frontend URL |
|---|---|---|
| **Local Dev** | `http://localhost:5000` | `http://localhost:5173` |
| **Production** | `https://task-manager-api-xyz.onrender.com` | Vercel, Render, or GitHub Pages |

Update `api.js` to point to your backend URL, and you're good to go!
