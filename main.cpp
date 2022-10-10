#include <sio_client.h>
// #include <pch.h>
#include <iostream>


using namespace sio;
using namespace std;

int main()
{
    string command = "w";

    sio::client io;
    io.set_open_listener([&]()
                         { io.socket()->emit("key", command); });
    io.connect("http://localhost:6000");

    return 1;
}