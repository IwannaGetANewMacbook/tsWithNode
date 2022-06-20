import {Request, Response, NextFunction, Application} from "express"
import * as express from "express"
import * as bcrypt from "bcrypt"
import * as cookieParser from "cookie-parser"
import * as cors from "cors"
import * as dotenv from "dotenv"
import * as expressSession from "express-session"
import helmet from "helmet"
import * as hpp from "hpp"
import * as morgan from "morgan"
import * as passport from "passport"
import * as passportLocal from "passport-local"
import exp = require("constants")

dotenv.config()
const app: Application = express()
const prod = process.env.NODE_ENV === "production"

app.set("port", prod? process.env.PORT : 3065)

// 미들웨어 등록하기!
if (prod) {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan("combined"))
  app.use(cors({
    origin: /nodebird\.com$/,
    credentials: true
  }))
} else {
  app.use(morgan("dev"))
  app.use(cors({
    origin: true,
    credentials: true
  }))
}

// 미들웨어 등록하기!
app.use("/", express.static("uploads"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET!, // !붙이면 타입때문에 당황하는 ts한테 확신을 줄 수 있음!
  cookie: {
    httpOnly: true,
    secure: false, // https 쓸때는 true로 바꾸어줌!
    domain: prod? ".nodebird.com" : undefined
  },
  name: "rnbck"
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("react nodebird backend completed!")
})

// 배포용은 포트를 자유자재로, 개발용은 포트를 3065로 고정시킴!
app.listen(app.get("port"), () => {
  console.log(`server is running on: ` + app.get("port"))
})
