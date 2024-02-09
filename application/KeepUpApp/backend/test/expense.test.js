const { addExpense, getExpense, deleteExpense } = require("../controllers/expense");
const ExpenseSchema = require("../models/ExpenseModel");
jest.mock("../models/ExpenseModel");

describe('addExpense', () => {
    let req, res
    beforeEach(() => {
      req = { body: { title: 'Test Expense', amount: 100, category: 'Test', description: 'Test description', date: '2022-04-28' } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    })
  
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    test('should successfully check if a valid expense is added and return 200', async () => {
      ExpenseSchema.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce()
      })
      await addExpense(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Expense Added' })
    })
  
    test('should successfully check if there are fields missing and return 400', async () => {
      req.body.title = ''
      await addExpense(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required!' })
    })
  
    test('should successfully check if the amount is a negative number and return 400', async () => {
      req.body.amount = -100
      await addExpense(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Amount must be a positive number!' })
    })
  
    test('should successfully check if there is a server error and return 500', async () => {
      ExpenseSchema.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce()
      })
      await addExpense(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' })
    })
  })

  describe('getExpense', () => {
    let req, res;
    beforeEach(() => {
        req = {};
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });
  
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return expenses and 200 status', async () => {
        const mockExpenses = [{title: 'Test Expense', amount: 100, category: 'Test', description: 'Test description', date: '2022-04-28'}]
        const mockFind = { sort: jest.fn().mockResolvedValueOnce(mockExpenses) }
        ExpenseSchema.find = jest.fn().mockReturnValueOnce(mockFind)
        await getExpense(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockExpenses);
    });

    test('should return 500 status when an error occurs', async () => {
      ExpenseSchema.mockRejectedValueOnce(new Error('error'));
      await getExpense(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' })
    });
});


describe('deleteExpense', () => {
    let req, res;
    beforeEach(() => {
        req = { params: { id: 'valid_id' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should work if a valid id is provided and return 200', async () => {
        ExpenseSchema.findByIdAndDelete.mockResolvedValueOnce({});
        await deleteExpense(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Expense Deleted' });
    });

    test('should return message when invalid id is provided and return 500', async () => {
        ExpenseSchema.findByIdAndDelete.mockRejectedValueOnce(new Error('error'));
        await deleteExpense(req, res)
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
});