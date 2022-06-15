import * as express from "express"
import {Request, Response, NextFunction} from "express"


const app = express()
const prod = process.env.NODE_ENV === "production"


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("react nodebird backend completed!")
})

// 배포용은 포트를 자유자재로, 개발용은 포트를 3065로 고정시킴!
app.listen(prod? process.env.PORT : 3065, () => {
  console.log(`server is running on ${process.env.PORT}`)
})
