const mongoose = require('mongoose')
const book = require('../Models/bookSchema')
class BookService {

    static async getBookList(condition, limit, skip) {
        try {
            return book
                .find(condition)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip)
        } catch (error) {
            console.log(error)
        }
    }


    static async createBook(option) {
        try {
            const data = new book(option);
            return await data.save();
        } catch (error) {
            console.log(error)
        }
    }
    static async updateBook(option, id) {
        return await book
            .findByIdAndUpdate(id, option, { new: true })
            .then((data) => {
                return data;
            })
            .catch((er) => {
                console.log(er)
            });
    }

    static async deleteBook(_id) {
        return await book
            .findByIdAndDelete(_id)
            .then((data) => {
                return data;
            })
            .catch((er) => {
                throw new Error(er);
            });
    }
    static async getBooksCount(condition) {

        try {
            const data = await book.find(condition);
            return data.length
        } catch (error) {
            console.log(error)
        }

    }
    static async getBookById(id) {
        try {
            return await book.findById(id)

        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = BookService;