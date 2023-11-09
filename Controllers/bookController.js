const bookService = require('../Services/bookService')
const { getPagination, getPagingData } = require('../Utils/index')
const bookServices = new bookService();

class BookController {
    static async getBookList(req, res) {

        const { page = 1, size = 20, query } = req.query;
        const { limit, offset } = getPagination(page, size);
        let filter = {};
        if (query) {
            filter = {
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { mobile: { $regex: query, $options: "i" } },
                    { email: { $regex: query, $options: "i" } },
                ],
            };
        }
        try {
            const totalCount = await bookService.getBooksCount(filter);
            // console.log(totalCount, filter, "ddddd")
            const getBookList = await bookService.getBookList(filter, limit, offset);
            const response = getPagingData(totalCount, page, limit, getBookList);
            return res.json({ error: false, msg: "OK", response });
        } catch (error) {
            console.log(error);
        }
    }
    static async createBook(request, response) {
        try {
            const data = await bookService.createBook(request.body);
            // return response.status(201).json(data);

            return response.json({error: false, msg: "OK",data })
        } catch (error) {
            console.log(error);
            // return res.status(400).json({ error: true, msg: e.message });
        }
    }

    static async updateBook(req, response) {
        try {
            const id = req.params.id;
            const x = await bookService.getBookById(id)
            if (!x) {
                return response.status(404).json("Not Found");
            }
            const data = await bookService.updateBook(req.body, x.id);
            return response.status(201).json(data);
        } catch (error) {
            console.log(error)
        }
    }

    static async deleteBook(req, response) {
        const id = req.params.id;
        const x = await bookService.getBookById(id)
        if (!x) {
            return response.status(404).json("Not Found");
        }
        const k = await bookService.deleteBook(x.id);
        return response.status(202).json("Data delete Successfully")
    }

    static async getBookById(req, response) {
        try {
            const data = await bookService.getBookById(req.params.id)
            if (!data) {
                return response.status(404).json("Not Found");
            }
            return response.json({ error: false, msg: "OK",data });


        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = BookController