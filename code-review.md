# Code Review: Issues Found

## Issue #1: Missing Null Check in Toggle Function
**File:** src/App.jsx (line 56)

**Problem:** If task gets deleted before user clicks it, app crashes.

**Fix:** Added check for missing task:
```javascript
if (!task) {
  setError('Task not found')
  return
}
```

## Issue #2: React List Keys
**Status:** ✅ Already correct - uses `key={task.id}`

## Issue #3: Race Condition in Add Task
**File:** src/App.jsx (line 45)

**Problem:** Using stale `tasks` closure. Can lose data with rapid adds.

**Fix:** Changed to functional setState:
```javascript
setTasks(prevTasks => [...prevTasks, newTask])
```

## Issue #4: Console Logs
**Problem:** Debug `console.error()` left in code.

**Fix:** Removed all debugging logs.

## Issue #5: Input Sanitization
**File:** backend/server.js

**Problem:** No XSS protection on task titles.

**Fix:** Added sanitization:
```javascript
const sanitizeString = (str) => str.replace(/[<>]/g, '').trim()
```

## Issue #6: Priority Validation
**Status:** ✅ Acceptable - dropdown enforces values

## Summary

| # | Issue | Fixed |
|---|-------|-------|
| 1 | Missing null check | ✅ |
| 2 | List keys | ✅ Already good |
| 3 | Race condition | ✅ |
| 4 | Console logs | ✅ |
| 5 | XSS sanitization | ✅ |
| 6 | Priority validation | ✅ OK |

All CRUD operations work. Error handling in place.

