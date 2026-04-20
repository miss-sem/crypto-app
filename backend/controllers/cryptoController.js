const Crypto = require("../models/Crypto");

const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find();
    res.status(200).json({ success: true, count: cryptos.length, data: cryptos });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });
    res.status(200).json({ success: true, count: gainers.length, data: gainers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: newListings.length, data: newListings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || !price || !image || change24h === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const crypto = await Crypto.create({ name, symbol, price, image, change24h });

    res.status(201).json({
      success: true,
      message: "Cryptocurrency added successfully.",
      data: crypto,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
};

module.exports = { getAllCryptos, getGainers, getNewListings, addCrypto };
