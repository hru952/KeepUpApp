const { addIncome, getIncomes, deleteIncome } = require("../controllers/income");
const IncomeSchema = require("../models/IncomeModel");
jest.mock("../models/IncomeModel");

describe('addIncome', () => {
    let req, res
    beforeEach(() => {
      req = { body: { title: 'Test Income', amount: 100, category: 'Test', description: 'Test description', date: '2022-04-28' } }
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    })
  
    afterEach(() => {
      jest.clearAllMocks()
    })
  
    test('should successfully check if a valid Income is added and return 200', async () => {
      IncomeSchema.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce()
      })
      await addIncome(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({ message: 'Income Added' })
    })
  
    test('should successfully check if there are fields missing and return 400', async () => {
      req.body.title = ''
      await addIncome(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required!' })
    })
  
    test('should successfully check if the amount is a negative number and return 400', async () => {
      req.body.amount = -100
      await addIncome(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({ message: 'Amount must be a positive number!' })
    })
  
    test('should successfully check if there is a server error and return 500', async () => {
      IncomeSchema.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce()
      })
      await addIncome(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' })
    })
  })

  describe('getIncome', () => {
    let req, res;
    beforeEach(() => {
        req = {};
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });
  
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return Incomes and 200 status', async () => {
        const mockIncomes = [{title: 'Test Income', amount: 100, category: 'Test', description: 'Test description', date: '2022-04-28'}]
        const mockFind = { sort: jest.fn().mockResolvedValueOnce(mockIncomes) }
        IncomeSchema.find = jest.fn().mockReturnValueOnce(mockFind)
        await getIncomes(req, res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith(mockIncomes);
    });

    test('should return 500 status when an error occurs', async () => {
      IncomeSchema.mockRejectedValueOnce(new Error('error'));
      await getIncomes(req, res)
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' })
    });
});

  describe('deleteIncome', () => {
    let req, res;
    beforeEach(() => {
        req = { params: { id: 'valid_id' } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should work if a valid id is provided and return 200', async () => {
        IncomeSchema.findByIdAndDelete.mockResolvedValueOnce({});
        await deleteIncome(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Income Deleted' });
    });

    test('should return message when invalid id is provided and return 500', async () => {
        IncomeSchema.findByIdAndDelete.mockRejectedValueOnce(new Error('error'));
        await deleteIncome(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Server Error' });
    });
});