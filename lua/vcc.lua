local ltn12 = require("ltn12")
local http = require("socket.http")
local md5 = require("md5")
local io = require("io")

--[[ INPUT VARIABLES ]]--
local URL = "http://www.google.com"
local FILE = "/home/mmarsh/fourrooms.lua"

-- to be wrapped around call to request(), using the returned value as index    
local RULES = {
    [200]=true,
    [304]=false
}

-- when passed the location of an existing file, returns the contents of file
local function read (path)
    if not path then return nil end
    local file = io.open(path,"r")
    if not file then return nil end
    local c = file:read("*all")
    file:close()
    return c
end

-- sends GET request to desired hostname and header, returning statuscode, sink
local function request (ip, value)
    local out = {}
    b, code, headers, statusline = http.request {
        url = ip,
        method = "GET",
        headers = { "If-Modified: ".. value },
        sink = ltn12.sink.table(out)
    }
    return code, sink
end

answer = RULES[request(URL,md5.sumhexa(read(FILE)))] or nil     

-- demonstration purposes
print (answer)
print (string.format("memory: %.3fKB\n", collectgarbage("count")))

return answer
