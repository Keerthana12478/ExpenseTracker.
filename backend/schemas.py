from pydantic import BaseModel

class ExpenseBase(BaseModel):
    title: str
    amount: float

class ExpenseCreate(ExpenseBase):
    pass

class Expense(ExpenseBase):
    id: int
    class Config:
        orm_mode = True

class BudgetBase(BaseModel):
    total: float

class Budget(BudgetBase):
    id: int
    class Config:
        orm_mode = True
