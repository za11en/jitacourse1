const gameData = {
    categories: [
        {
            name: "Binary Basics",
            questions: [
                {
                    value: 200,
                    clue: "This base-2 numeral system is the communication that a computer uses.",
                    alternates: [
                        { clue: "This base-2 numeral system is the communication that a computer uses.", answer: "Binary" },
                        { clue: "A computer communicates using this numeral system.", answer: "Binary" },
                        { clue: "The base 2 numeral system that computers use for communication is called this.", answer: "Binary" },
                        { clue: "What is the term for the base 2 system computers use to communicate?", answer: "Binary" },
                        { clue: "Computers communicate using this system of 1s and 0s.", answer: "Binary" }
                    ]
                },
                {
                    value: 400,
                    clue: "How many bits make up one byte?",
                    alternates: [
                        { clue: "How many bits make up one byte?", answer: "eight" },
                        { clue: "A byte consists of this many bits.", answer: "eight" },
                        { clue: "This number of bits forms a byte.", answer: "eight" },
                        { clue: "What is the standard number of bits in a byte?", answer: "eight" },
                        { clue: "The next unit of binary, a byte, consists of this many bits.", answer: "eight" }
                    ]
                },
                {
                    value: 600,
                    clue: "This newer standard coding system allows a character to be stored in more than one byte.",
                    alternates: [
                        { clue: "This newer standard coding system allows a character to be stored in more than one byte.", answer: "UTF-8" },
                        { clue: "Unicode Transformation Format - 8 bits is also known as this.", answer: "UTF-8" },
                        { clue: "What does UTF-8 stand for?", answer: "Unicode Transformation Format - 8 bits" },
                        { clue: "This modern coding system can store characters in more than one byte.", answer: "UTF-8" },
                        { clue: "Unlike ASCII, this coding standard can use more than a single byte for characters.", answer: "UTF-8" }
                    ]
                },
                {
                    value: 800,
                    clue: "This is the smallest unit of data in a computer, represented as a 0 or 1.",
                    alternates: [
                        { clue: "This is the smallest unit of data in a computer, represented as a 0 or 1.", answer: "Bit" },
                        { clue: "A binary digit, or this, is the fundamental unit of information.", answer: "Bit" },
                        { clue: "What is the term for a single binary digit, either 0 or 1?", answer: "Bit" },
                        { clue: "The most basic unit of data, a 0 or a 1, is called a...", answer: "Bit" },
                        { clue: "Composed of a 0 or a 1, this is the smallest piece of computer data.", answer: "Bit" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This numerical base uses 16 unique symbols, 0-9 and A-F, and is often used in computing to represent binary data compactly.",
                    alternates: [
                        { clue: "This numerical base uses 16 unique symbols, 0-9 and A-F, and is often used in computing to represent binary data compactly.", answer: "Hexadecimal" },
                        { clue: "Often abbreviated as 'hex,' this base-16 system simplifies long binary strings.", answer: "Hexadecimal" },
                        { clue: "What number system includes digits 0-9 and letters A-F?", answer: "Hexadecimal" },
                        { clue: "Representing values from 0 to 15, this base is commonly seen in memory addresses and color codes.", answer: "Hexadecimal" },
                        { clue: "A computer number system that uses sixteen distinct symbols is known as this.", answer: "Hexadecimal" }
                    ]
                }
            ]
        },
        {
            name: "Computer Components",
            questions: [
                {
                    value: 200,
                    clue: "This is considered the brain of your computer, performing calculations and data processing.",
                    alternates: [
                        { clue: "This is considered the brain of your computer, performing calculations and data processing.", answer: "CPU" },
                        { clue: "The Central Processing Unit is often referred to as this.", answer: "Brain of the computer" },
                        { clue: "What does CPU stand for?", answer: "Central Processing Unit" },
                        { clue: "All calculations and data processing are handled by this computer component.", answer: "CPU" },
                        { clue: "This microchip is the primary component that performs functions on data.", answer: "CPU" }
                    ]
                },
                {
                    value: 400,
                    clue: "This row of wires interconnects parts of a computer, acting like veins.",
                    alternates: [
                        { clue: "This row of wires interconnects parts of a computer, acting like veins.", answer: "External Data Bus" },
                        { clue: "What does EDB stand for?", answer: "External Data Bus" },
                        { clue: "Bits physically travel around our computer via this component.", answer: "External Data Bus" },
                        { clue: "It connects the various parts of our computer like veins in our body.", answer: "External Data Bus" },
                        { clue: "The EDB refers to this component.", answer: "External Data Bus" }
                    ]
                },
                {
                    value: 600,
                    clue: "This CPU component keeps its operations in sync by sending a voltage when data is sent or received.",
                    alternates: [
                        { clue: "This CPU component keeps its operations in sync by sending a voltage when data is sent or received.", answer: "Clock Wire" },
                        { clue: "The CPU has an internal clock that connects to this special wire.", answer: "Clock Wire" },
                        { clue: "A voltage is sent to this wire to let the CPU know it can start doing calculations.", answer: "Clock Wire" },
                        { clue: "What does the CPU use to keep its operations synchronized?", answer: "Clock Wire" },
                        { clue: "Referred to as a clock cycle when a voltage is sent, what is this component?", answer: "Clock Wire" }
                    ]
                },
                {
                    value: 800,
                    clue: "This component executes instructions from computer programs, often having multiple cores.",
                    alternates: [
                        { clue: "This component executes instructions from computer programs, often having multiple cores.", answer: "Processor" },
                        { clue: "Another name for the CPU, responsible for carrying out program instructions.", answer: "Processor" },
                        { clue: "What central component performs the bulk of a computer's processing?", answer: "Processor" },
                        { clue: "It processes data and executes commands, acting as the primary computational engine.", answer: "Processor" },
                        { clue: "Often found with several 'cores,' this part does the actual computing work.", answer: "Processor" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This specialized processor is designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer.",
                    alternates: [
                        { clue: "This specialized processor is designed to rapidly manipulate and alter memory to accelerate the creation of images in a frame buffer.", answer: "GPU" },
                        { clue: "What does GPU stand for?", answer: "Graphics Processing Unit" },
                        { clue: "A Graphics Processing Unit is commonly abbreviated as this.", answer: "GPU" },
                        { clue: "Essential for gaming and video editing, this unit handles graphics rendering.", answer: "GPU" },
                        { clue: "It excels at parallel processing, making it ideal for tasks like rendering high-resolution video and 3D graphics.", answer: "GPU" }
                    ]
                }
            ]
        },
        {
            name: "Memory & Storage",
            questions: [
                {
                    value: 200,
                    clue: "This type of memory chip stores your BIOS and is non-volatile.",
                    alternates: [
                        { clue: "This type of memory chip stores your BIOS and is non-volatile.", answer: "ROM" },
                        { clue: "What does ROM stand for?", answer: "Read Only Memory" },
                        { clue: "Unlike RAM, data on this memory chip isn't lost when the computer is turned off.", answer: "ROM" },
                        { clue: "Where is the BIOS stored?", answer: "ROM" },
                        { clue: "The Basic Input Output Services are stored on this non-volatile memory chip.", answer: "ROM" }
                    ]
                },
                {
                    value: 400,
                    clue: "What does DRAM stand for?",
                    alternates: [
                        { clue: "What does DRAM stand for?", answer: "Dynamic Random-Access Memory" },
                        { clue: "This type of RAM is commonly found in computers and stores bits in microscopic capacitors.", answer: "DRAM" },
                        { clue: "Dynamic Random-Access Memory is abbreviated as this.", answer: "DRAM" },
                        { clue: "A microscopic capacitor is used to store bits in this type of RAM.", answer: "DRAM" },
                        { clue: "When a 1 or 0 is sent to this memory type, it's stored in a capacitor.", answer: "DRAM" }
                    ]
                },
                {
                    value: 600,
                    clue: "This type of RAM is used for graphics memory on video adapters.",
                    alternates: [
                        { clue: "This type of RAM is used for graphics memory on video adapters.", answer: "GDDR SDRAM" },
                        { clue: "What does GDDR SDRAM typically refer to?", answer: "Graphics memory" },
                        { clue: "Memory used on video adapters falls under this category of RAM.", answer: "GDDR SDRAM" },
                        { clue: "Which RAM type is specifically designed for graphical processing units?", answer: "GDDR SDRAM" },
                        { clue: "Video adapters commonly utilize this specific type of SDRAM.", answer: "GDDR SDRAM" }
                    ]
                },
                {
                    value: 800,
                    clue: "This high-speed memory acts as a buffer between the CPU and main memory to reduce average data access time.",
                    alternates: [
                        { clue: "This high-speed memory acts as a buffer between the CPU and main memory to reduce average data access time.", answer: "Cache" },
                        { clue: "What type of memory is very fast and located on or near the CPU to speed up access to frequently used data?", answer: "Cache" },
                        { clue: "Pronounced 'cash,' this small, fast memory stores copies of data from slower main memory.", answer: "Cache" },
                        { clue: "It improves performance by keeping frequently accessed data closer to the processor.", answer: "Cache" },
                        { clue: "A temporary storage area that the CPU can access quickly is known as this.", answer: "Cache" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This storage device uses solid-state memory to store persistent data, offering faster speeds than traditional HDDs.",
                    alternates: [
                        { clue: "This storage device uses solid-state memory to store persistent data, offering faster speeds than traditional HDDs.", answer: "SSD" },
                        { clue: "What does SSD stand for?", answer: "Solid-State Drive" },
                        { clue: "A Solid-State Drive, without any moving parts, is known by this abbreviation.", answer: "SSD" },
                        { clue: "Faster boot times and application loading are benefits of this modern storage technology.", answer: "SSD" },
                        { clue: "Unlike a hard disk drive, this storage medium uses flash memory to save data.", answer: "SSD" }
                    ]
                }
            ]
        },
        {
            name: "Mother boards & Power",
            questions: [
                {
                    value: 200,
                    clue: "This component is described as the body or circulatory system of the computer, connecting all the pieces.",
                    alternates: [
                        { clue: "This component is described as the body or circulatory system of the computer, connecting all the pieces.", answer: "Motherboard" },
                        { clue: "What is the main circuit board that connects all your components together?", answer: "Motherboard" },
                        { clue: "All computer components are connected together by this circuit board.", answer: "Motherboard" },
                        { clue: "The body or circulatory system of the computer refers to this.", answer: "Motherboard" },
                        { clue: "It serves as the central hub for connecting hardware components.", answer: "Motherboard" }
                    ]
                },
                {
                    value: 400,
                    clue: "This path connects the CPU and the Northbridge.",
                    alternates: [
                        { clue: "This path connects the CPU and the Northbridge.", answer: "Front-Side Bus" },
                        { clue: "What does FSB stand for?", answer: "Front-Side Bus" },
                        { clue: "Data can travel in both directions across this bus.", answer: "Front-Side Bus" },
                        { clue: "The path between the CPU and the Northbridge is known by this name.", answer: "Front-Side Bus" },
                        { clue: "It connects various components like the chipset, expansion cards, and RAM.", answer: "Front-Side Bus" }
                    ]
                },
                {
                    value: 600,
                    clue: "The frequency at which a CPU operates is determined by applying this to the FSB speed.",
                    alternates: [
                        { clue: "The frequency at which a CPU operates is determined by applying this to the FSB speed.", answer: "Clock multiplier" },
                        { clue: "What is used with the FSB speed to determine CPU operating frequency?", answer: "Clock multiplier" },
                        { clue: "To get the CPU's operating frequency, you apply this to the Front-Side Bus speed.", answer: "Clock multiplier" },
                        { clue: "This mathematical factor adjusts the FSB speed to derive the CPU's operational frequency.", answer: "Clock multiplier" },
                        { clue: "If a processor runs at 3200 MHz and uses a 400 MHz FSB, the CPU is 8 times faster due to this.", answer: "Clock multiplier" }
                    ]
                },
                {
                    value: 800,
                    clue: "This component regulates and supplies stable electrical power to the computer's components.",
                    alternates: [
                        { clue: "This component regulates and supplies stable electrical power to the computer's components.", answer: "Power Supply Unit" },
                        { clue: "What does PSU stand for?", answer: "Power Supply Unit" },
                        { clue: "A computer's Power Supply Unit is commonly referred to by this abbreviation.", answer: "PSU" },
                        { clue: "It converts AC power from the wall outlet to DC power needed by the computer.", answer: "Power Supply Unit" },
                        { clue: "Without this, your computer wouldn't receive the necessary electricity to run.", answer: "Power Supply Unit" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This part of the chipset on a motherboard handles communication between the CPU and high-speed components like RAM and graphics cards.",
                    alternates: [
                        { clue: "This part of the chipset on a motherboard handles communication between the CPU and high-speed components like RAM and graphics cards.", answer: "Northbridge" },
                        { clue: "In older motherboard architectures, this chip manages high-speed data flow.", answer: "Northbridge" },
                        { clue: "What chipset component is directly connected to the CPU and controls the memory bus?", answer: "Northbridge" },
                        { clue: "It's a hub for RAM, CPU, and AGP/PCIe, often requiring a heatsink.", answer: "Northbridge" },
                        { clue: "This bridge connects the CPU to the fastest components in a computer system.", answer: "Northbridge" }
                    ]
                }
            ]
        },
        {
            name: "Operating Systems & Software",
            questions: [
                {
                    value: 200,
                    clue: "This is the whole software package that manages our computer's resources and let's us interact with it.",
                    alternates: [
                        { clue: "This is the whole software package that manages our computer's resources and let's us interact with it.", answer: "Operating System" },
                        { clue: "What does OS stand for?", answer: "Operating System" },
                        { clue: "The entire package that manages a computer's resources is this.", answer: "Operating System" },
                        { clue: "It allows us to interact with our computer and manages its resources.", answer: "Operating System" },
                        { clue: "Windows, Mac, and Linux are examples of this.", answer: "Operating System" }
                    ]
                },
                {
                    value: 400,
                    clue: "This OS kernel manager handles programs from their order to how many resources they use.",
                    alternates: [
                        { clue: "This OS kernel manager handles programs from their order to how many resources they use.", answer: "Process Manager" },
                        { clue: "Our kernel manages the order and resources of programs in our system through this.", answer: "Process Manager" },
                        { clue: "Which kernel component is responsible for efficiently scheduling processes?", answer: "Process Manager" },
                        { clue: "It determines how fast programs run and how many resources they consume.", answer: "Process Manager" },
                        { clue: "The kernel's role in managing system programs, their order, and resource allocation is handled by this.", answer: "Process Manager" }
                    ]
                },
                {
                    value: 600,
                    clue: "This file system is common for Linux operating systems.",
                    alternates: [
                        { clue: "This file system is common for Linux operating systems.", answer: "Ext4" },
                        { clue: "What does Ext4 stand for?", answer: "fourth extended filesystem" },
                        { clue: "Linux typically uses this file system.", answer: "Ext4" },
                        { clue: "The extension 4 file system is known by this abbreviation.", answer: "Ext4" },
                        { clue: "If you're on a Linux OS, your file system is most likely this.", answer: "Ext4" }
                    ]
                },
                {
                    value: 800,
                    clue: "This core component of an operating system manages system resources, handles processes, and communicates with hardware.",
                    alternates: [
                        { clue: "This core component of an operating system manages system resources, handles processes, and communicates with hardware.", answer: "Kernel" },
                        { clue: "Often called the 'heart' of the OS, it's the bridge between applications and hardware.", answer: "Kernel" },
                        { clue: "What part of an operating system is responsible for managing low-level tasks?", answer: "Kernel" },
                        { clue: "Linux and Windows both have their own version of this central software component.", answer: "Kernel" },
                        { clue: "It controls everything in the system, from memory to I/O devices, acting as the OS's fundamental core.", answer: "Kernel" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This type of software is copyrighted and proprietary, meaning users typically purchase a license to use it.",
                    alternates: [
                        { clue: "This type of software is copyrighted and proprietary, meaning users typically purchase a license to use it.", answer: "Commercial Software" },
                        { clue: "Examples include Microsoft Office or Adobe Photoshop, requiring a paid license.", answer: "Commercial Software" },
                        { clue: "What is software that is sold for profit, often with restrictions on use and distribution?", answer: "Commercial Software" },
                        { clue: "Unlike open-source, this software is typically developed and maintained by a company for revenue.", answer: "Commercial Software" },
                        { clue: "A user usually has to pay a fee or subscription to legally use this kind of software.", answer: "Commercial Software" }
                    ]
                }
            ]
        },
        {
            name: "Networking & Peripherals",
            questions: [
                {
                    value: 200,
                    clue: "This is an interconnection of computers.",
                    alternates: [
                        { clue: "This is an interconnection of computers.", answer: "Network" },
                        { clue: "What is an interconnection of computers?", answer: "Network" },
                        { clue: "When computers are connected, they form this.", answer: "Network" },
                        { clue: "A group of interconnected computers is called this.", answer: "Network" },
                        { clue: "Networking involves managing, building, and designing these.", answer: "Networks" }
                    ]
                },
                {
                    value: 400,
                    clue: "This device connects many different devices and helps route network traffic.",
                    alternates: [
                        { clue: "This device connects many different devices and helps route network traffic.", answer: "Router" },
                        { clue: "What connects lots of different devices together and routes network traffic?", answer: "Router" },
                        { clue: "Some connections can be through an ethernet cable, Wi-Fi, or a fiber optic cable, all handled by this.", answer: "Router" },
                        { clue: "A device that computers connect to, which then connects to switches and hubs, is this.", answer: "Router" },
                        { clue: "It ensures data packets reach their correct destinations across different networks.", answer: "Router" }
                    ]
                },
                {
                    value: 600,
                    clue: "This is the standard for many televisions and computers nowadays, outputting both audio and visual.",
                    alternates: [
                        { clue: "This is the standard for many televisions and computers nowadays, outputting both audio and visual.", answer: "HDMI" },
                        { clue: "What does HDMI stand for?", answer: "High-Definition Multimedia Interface" },
                        { clue: "A lot of televisions and computers use this standard for audio and video output.", answer: "HDMI" },
                        { clue: "It's a common cable type that carries both audio and video signals.", answer: "HDMI" },
                        { clue: "Both audio and visual signals are outputted by this common connector.", answer: "HDMI" }
                    ]
                },
                {
                    value: 800,
                    clue: "This unique numerical label is assigned to each device connected to a computer network, allowing it to communicate.",
                    alternates: [
                        { clue: "This unique numerical label is assigned to each device connected to a computer network, allowing it to communicate.", answer: "IP Address" },
                        { clue: "What does IP stand for in IP Address?", answer: "Internet Protocol" },
                        { clue: "An Internet Protocol Address is often simply called this.", answer: "IP Address" },
                        { clue: "It identifies a device on a TCP/IP network, enabling communication.", answer: "IP Address" },
                        { clue: "Every device on a network needs one of these to send and receive data.", answer: "IP Address" }
                    ]
                },
                {
                    value: 1000,
                    clue: "This networking device connects multiple network segments and forwards data packets between them based on their IP addresses.",
                    alternates: [
                        { clue: "This networking device connects multiple network segments and forwards data packets between them based on their IP addresses.", answer: "Router" },
                        { clue: "While also connecting devices, its primary role is to direct traffic between different networks.", answer: "Router" },
                        { clue: "What device determines the best path for data to travel across interconnected networks?", answer: "Router" },
                        { clue: "It operates at Layer 3 of the OSI model and uses IP addresses to make forwarding decisions.", answer: "Router" },
                        { clue: "Unlike a switch, this device can route data between different subnets or the internet.", answer: "Router" }
                    ]
                }
            ]
        }
    ]
};
