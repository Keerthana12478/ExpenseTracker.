from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Expense(Base):
    __tablename__ = "expenses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    amount = Column(Float)

class Budget(Base):
    __tablename__ = "budget"
    id = Column(Integer, primary_key=True, index=True)
    total = Column(Float)
