from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine
import webbrowser, threading
import uvicorn

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="My Budget Manager")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/expenses/", response_model=schemas.Expense)
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    db_expense = models.Expense(title=expense.title, amount=expense.amount)
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)
    return db_expense

@app.get("/expenses/", response_model=list[schemas.Expense])
def get_expenses(db: Session = Depends(get_db)):
    return db.query(models.Expense).all()

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db)):
    db_exp = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if db_exp:
        db.delete(db_exp)
        db.commit()
    return {"ok": True}

@app.get("/budget/", response_model=list[schemas.Budget])
def get_budget(db: Session = Depends(get_db)):
    return db.query(models.Budget).all()

@app.post("/budget/", response_model=schemas.Budget)
def set_budget(budget: schemas.BudgetBase, db: Session = Depends(get_db)):
    db.query(models.Budget).delete()
    db.commit()
    new_budget = models.Budget(total=budget.total)
    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)
    return new_budget

@app.delete("/clear/")
def clear_all(db: Session = Depends(get_db)):
    db.query(models.Expense).delete()
    db.query(models.Budget).delete()
    db.commit()
    return {"ok": True}

def open_browser():
    webbrowser.open("http://localhost:8000")

if __name__ == "__main__":
    threading.Timer(1.0, open_browser).start()
    uvicorn.run(app, host="0.0.0.0", port=8000)
