const express = require("express");
const fs = require("fs");
const path = require("path");
const Mock = require("mockjs");
const sizeOf = require("image-size");

const router = express.Router();

const files = fs.readdirSync(path.resolve(__dirname, "./images"));
const datasource = files.map((filename) => {
    const dimensions = sizeOf(path.resolve(__dirname, `./images/${filename}`));
    return {
        id: Mock.mock("@id"),
        src: `/public/${filename}`,
        width: dimensions.width,
        height: dimensions.height,
        description: Mock.mock("@sentence(5, 10)"),
    };
});

const getRandomLimitData = (arr, num) => {
    const cloneArr = [...arr];
    const limit = Math.min(num, cloneArr.length);
    const data = [];
    const prefix = performance.now();
    for (let i = 0; i < limit; i += 1) {
        const arrIndex = Math.floor(Math.random() * cloneArr.length);
        const target = cloneArr[arrIndex];
        const { id, ...rest } = target;
        data[i] = { ...rest, id: `${id}-${prefix}` };
        cloneArr.splice(arrIndex, 1);
    }
    return data;
};

router.get("/test/search/images", (req, res) => {
    const data = getRandomLimitData(datasource, req.query.limit || 45);
    res.json({
        data,
        state: "SUCCESS",
    });
});

module.exports = router;
