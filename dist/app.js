"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const database_config_1 = __importDefault(require("./config/database.config"));
const cors_1 = __importDefault(require("cors"));
const airQualityRoute_1 = __importDefault(require("./routes/airQualityRoute"));
//db.sync({force:true})--- to clear the database
database_config_1.default.sync().then(() => {
    console.log('connected successfully, on port:');
});
exports.app = (0, express_1.default)();
// view engine setup
exports.app.set('views', path_1.default.join(__dirname, '../views'));
exports.app.set('view engine', 'ejs');
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.use('/api/air-quality', airQualityRoute_1.default);
// catch 404 and forward to error handler
exports.app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
exports.app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = exports.app;
