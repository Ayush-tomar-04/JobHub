const { auth } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();
test("rejects request without authorization header",()=>{
    const req = {headers:{}}
    const res = {
        status: jest.fn().mockReturnThis(),
        json:jest.fn()

    }
    const next = jest.fn()

    auth(req,res,next)
expect(res.status).toHaveBeenCalledWith(401)
expect(next).not.toHaveBeenCalled();
})

test("calls next when token is valid",()=>{
    const token = jwt.sign(
        {userId:"user123",role:"user"},
        process.env.JWT_SECRET
        )
    const req = {
        headers:{
        authorization: `Bearer ${token}`
    }
    }
    const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    const next = jest.fn()
    auth(req,res,next)
    expect(next).toHaveBeenCalledTimes(1)
})

test("rejects request with invalid token", () => {
  const req = {
    headers: {
        authorization: "Bearer invalid-token"
    }
};
 const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    const next = jest.fn()
    auth(req,res,next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
});
test("rejects request with expired token", () => {

    const token = jwt.sign(
    { userId: "user123", role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "-1s" }
);

const req = {
    headers: {
        authorization: `Bearer ${token}`
    }
};

    const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    const next = jest.fn()
    auth(req,res,next)
    
    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
});

test("Malformed authorization header", () => {

const req = {
    headers: {
        authorization: "Invalid Token"
    }
};

    const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    const next = jest.fn()
    auth(req,res,next)
    
    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
});

test("Missing Token after Bearer",()=>{

    const req = {headers:{
        authorization: `Bearer`
    }}

    const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }

    const next = jest.fn()

    auth(req,res,next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
})

test("decode the user aand assign valid userID,role",()=>{

    const token = jwt.sign(
        { userId: "user123", role: "user" },
        process.env.JWT_SECRET,
    )
    const req = {
    headers: {
        authorization: `Bearer ${token}`
    }
};

    const res = {
        status:jest.fn().mockReturnThis(),
        json:jest.fn()
    }
    const next = jest.fn()

    auth(req,res,next)
    expect(req.user.userId).toBe("user123")
    expect(req.user.role).toBe("user")
    expect(next).toHaveBeenCalledTimes(1)
})