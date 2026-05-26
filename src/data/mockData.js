export const kycRequests = [
  {
    id:"USR-001", name:"Priya Sharma", initials:"PS", color:"#6C63FF",
    submitted:"25 May, 09:12 AM", status:"Pending",
    email:"priya.sharma@email.com", phone:"+91 98765 43210",
    dob:"15 Aug 1995", address:"123, MG Road, Bangalore, Karnataka",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 4321", name: "Priya Sharma",    dob: "15-08-1995", address: "123, MG Road, Bangalore, Karnataka" },
      pan:      { submitted: true,  number: "ABCDE1234F",     name: "PRIYA SHARMA",    dob: "15/08/1995" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-002", name:"Rahul Mehta", initials:"RM", color:"#FF6584",
    submitted:"25 May, 08:55 AM", status:"In Review",
    email:"rahul.mehta@email.com", phone:"+91 91234 56789",
    dob:"22 Mar 1990", address:"456, Linking Road, Mumbai, Maharashtra",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 7890", name: "Rahul Mehta",     dob: "22-03-1990", address: "456, Linking Road, Mumbai, Maharashtra" },
      pan:      { submitted: true,  number: "FGHIJ5678K",     name: "RAHUL MEHTA",     dob: "22/03/1990" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-003", name:"Ananya Reddy", initials:"AR", color:"#43E97B",
    submitted:"24 May, 05:30 PM", status:"Pending",
    email:"ananya.reddy@email.com", phone:"+91 87654 32109",
    dob:"10 Jun 1998", address:"789, Banjara Hills, Hyderabad, Telangana",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 1122", name: "Ananya Reddy",    dob: "10-06-1998", address: "789, Banjara Hills, Hyderabad" },
      pan:      { submitted: false },
      passport: { submitted: true,  number: "P1234567",       name: "ANANYA REDDY",    expiry: "2030-06-10", country: "India" },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-004", name:"Vikram Singh", initials:"VS", color:"#FA8231",
    submitted:"24 May, 04:00 PM", status:"Approved",
    email:"vikram.singh@email.com", phone:"+91 76543 21098",
    dob:"05 Jan 1985", address:"321, Connaught Place, New Delhi",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 3344", name: "Vikram Singh",    dob: "05-01-1985", address: "321, Connaught Place, New Delhi" },
      pan:      { submitted: true,  number: "KLMNO9012P",     name: "VIKRAM SINGH",    dob: "05/01/1985" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-005", name:"Meera Nair", initials:"MN", color:"#E74C3C",
    submitted:"24 May, 02:20 PM", status:"Failed",
    email:"meera.nair@email.com", phone:"+91 65432 10987",
    dob:"18 Sep 1993", address:"654, MG Road, Kochi, Kerala",
    rejectionReason:"Documents unclear, Aadhaar & PAN details mismatch",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 5566", name: "Meera Nair",      dob: "18-09-1993", address: "654, MG Road, Kochi, Kerala" },
      pan:      { submitted: true,  number: "QRSTU3456V",     name: "MEERA NAIR",      dob: "18/09/1993" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-006", name:"Arjun Patel", initials:"AP", color:"#3498DB",
    submitted:"24 May, 12:05 PM", status:"Pending",
    email:"arjun.patel@email.com", phone:"+91 54321 09876",
    dob:"28 Dec 1992", address:"987, CG Road, Ahmedabad, Gujarat",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 7788", name: "Arjun Patel",     dob: "28-12-1992", address: "987, CG Road, Ahmedabad, Gujarat" },
      pan:      { submitted: true,  number: "VWXYZ7890A",     name: "ARJUN PATEL",     dob: "28/12/1992" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-007", name:"Sneha Kapoor", initials:"SK", color:"#9B59B6",
    submitted:"23 May, 11:45 AM", status:"In Review",
    email:"sneha.kapoor@email.com", phone:"+91 43210 98765",
    dob:"14 Apr 1997", address:"147, Sector 17, Chandigarh",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 9900", name: "Sneha Kapoor",    dob: "14-04-1997", address: "147, Sector 17, Chandigarh" },
      pan:      { submitted: false },
      passport: { submitted: true,  number: "P9876543",       name: "SNEHA KAPOOR",    expiry: "2029-04-14", country: "India" },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-008", name:"Karthik Rao", initials:"KR", color:"#1ABC9C",
    submitted:"23 May, 09:30 AM", status:"Approved",
    email:"karthik.rao@email.com", phone:"+91 32109 87654",
    dob:"03 Jul 1988", address:"258, Indiranagar, Bangalore, Karnataka",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 1234", name: "Karthik Rao",     dob: "03-07-1988", address: "258, Indiranagar, Bangalore" },
      pan:      { submitted: true,  number: "BCDEF2345G",     name: "KARTHIK RAO",     dob: "03/07/1988" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-009", name:"Divya Menon", initials:"DM", color:"#F39C12",
    submitted:"23 May, 08:00 AM", status:"Approved",
    email:"divya.menon@email.com", phone:"+91 21098 76543",
    dob:"25 Nov 1994", address:"369, Anna Nagar, Chennai, Tamil Nadu",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 5678", name: "Divya Menon",     dob: "25-11-1994", address: "369, Anna Nagar, Chennai" },
      pan:      { submitted: true,  number: "HIJKL6789M",     name: "DIVYA MENON",     dob: "25/11/1994" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-010", name:"Rohit Gupta", initials:"RG", color:"#E67E22",
    submitted:"22 May, 04:15 PM", status:"Failed",
    email:"rohit.gupta@email.com", phone:"+91 10987 65432",
    dob:"07 Feb 1991", address:"741, Hazratganj, Lucknow, Uttar Pradesh",
    rejectionReason:"Images are cropped and not clear",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 9012", name: "Rohit Gupta",     dob: "07-02-1991", address: "741, Hazratganj, Lucknow" },
      pan:      { submitted: true,  number: "NOPQR0123S",     name: "ROHIT GUPTA",     dob: "07/02/1991" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-011", name:"Lakshmi Iyer", initials:"LI", color:"#8E44AD",
    submitted:"22 May, 11:00 AM", status:"Approved",
    email:"lakshmi.iyer@email.com", phone:"+91 99887 76655",
    dob:"12 Mar 1989", address:"22, T Nagar, Chennai, Tamil Nadu",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 3456", name: "Lakshmi Iyer",    dob: "12-03-1989", address: "22, T Nagar, Chennai" },
      pan:      { submitted: true,  number: "STUVW4567X",     name: "LAKSHMI IYER",    dob: "12/03/1989" },
      passport: { submitted: false },
      selfie:   { submitted: true }
    }
  },
  {
    id:"USR-012", name:"Aditya Kumar", initials:"AK", color:"#16A085",
    submitted:"21 May, 03:30 PM", status:"Pending",
    email:"aditya.kumar@email.com", phone:"+91 88776 65544",
    dob:"30 Jul 2000", address:"77, Salt Lake, Kolkata, West Bengal",
    rejectionReason:"",
    documents: {
      aadhaar:  { submitted: true,  number: "XXXX XXXX 7890", name: "Aditya Kumar",    dob: "30-07-2000", address: "77, Salt Lake, Kolkata" },
      pan:      { submitted: false },
      passport: { submitted: true,  number: "P5432109",       name: "ADITYA KUMAR",    expiry: "2032-07-30", country: "India" },
      selfie:   { submitted: true }
    }
  },
];

export const users = [
  { id:"USR-001", name:"Priya Sharma",  email:"priya.sharma@email.com",  phone:"+91 98765 43210", kyc:"Pending",   wallet:"0 PYO",    joined:"20 May 2026", initials:"PS", color:"#6C63FF" },
  { id:"USR-002", name:"Rahul Mehta",   email:"rahul.mehta@email.com",   phone:"+91 91234 56789", kyc:"In Review", wallet:"0 PYO",    joined:"19 May 2026", initials:"RM", color:"#FF6584" },
  { id:"USR-003", name:"Ananya Reddy",  email:"ananya.reddy@email.com",  phone:"+91 87654 32109", kyc:"Pending",   wallet:"0 PYO",    joined:"18 May 2026", initials:"AR", color:"#43E97B" },
  { id:"USR-004", name:"Vikram Singh",  email:"vikram.singh@email.com",  phone:"+91 76543 21098", kyc:"Approved",  wallet:"1,250 PYO",joined:"15 May 2026", initials:"VS", color:"#FA8231" },
  { id:"USR-005", name:"Meera Nair",    email:"meera.nair@email.com",    phone:"+91 65432 10987", kyc:"Failed",    wallet:"0 PYO",    joined:"14 May 2026", initials:"MN", color:"#E74C3C" },
  { id:"USR-006", name:"Arjun Patel",   email:"arjun.patel@email.com",   phone:"+91 54321 09876", kyc:"Pending",   wallet:"0 PYO",    joined:"12 May 2026", initials:"AP", color:"#3498DB" },
  { id:"USR-007", name:"Sneha Kapoor",  email:"sneha.kapoor@email.com",  phone:"+91 43210 98765", kyc:"In Review", wallet:"0 PYO",    joined:"10 May 2026", initials:"SK", color:"#9B59B6" },
  { id:"USR-008", name:"Karthik Rao",   email:"karthik.rao@email.com",   phone:"+91 32109 87654", kyc:"Approved",  wallet:"820 PYO",  joined:"08 May 2026", initials:"KR", color:"#1ABC9C" },
  { id:"USR-009", name:"Divya Menon",   email:"divya.menon@email.com",   phone:"+91 21098 76543", kyc:"Approved",  wallet:"2,500 PYO",joined:"05 May 2026", initials:"DM", color:"#F39C12" },
  { id:"USR-010", name:"Rohit Gupta",   email:"rohit.gupta@email.com",   phone:"+91 10987 65432", kyc:"Failed",    wallet:"0 PYO",    joined:"02 May 2026", initials:"RG", color:"#E67E22" },
  { id:"USR-011", name:"Lakshmi Iyer",  email:"lakshmi.iyer@email.com",  phone:"+91 99887 76655", kyc:"Approved",  wallet:"540 PYO",  joined:"01 May 2026", initials:"LI", color:"#8E44AD" },
  { id:"USR-012", name:"Aditya Kumar",  email:"aditya.kumar@email.com",  phone:"+91 88776 65544", kyc:"Pending",   wallet:"0 PYO",    joined:"28 Apr 2026", initials:"AK", color:"#16A085" },
];

export const wallets = [
  {
    id:"WAL-001", user:"Vikram Singh",  userId:"USR-004", tokens:1250,  status:"Active",
    initials:"VS", color:"#FA8231",
    transactions:[
      { id:"TXN-001", type:"Received", from:"WAL-003", amount:500,  date:"24 May 2026, 03:10 PM", note:"Payment for services" },
      { id:"TXN-002", type:"Sent",     to:"WAL-002",   amount:200,  date:"23 May 2026, 11:30 AM", note:"Transfer" },
      { id:"TXN-003", type:"Received", from:"WAL-005", amount:750,  date:"22 May 2026, 09:00 AM", note:"Token swap" },
      { id:"TXN-004", type:"Sent",     to:"WAL-004",   amount:300,  date:"20 May 2026, 02:45 PM", note:"Merchant payment" },
    ]
  },
  {
    id:"WAL-002", user:"Karthik Rao",   userId:"USR-008", tokens:820,   status:"Active",
    initials:"KR", color:"#1ABC9C",
    transactions:[
      { id:"TXN-005", type:"Received", from:"WAL-001", amount:200,  date:"23 May 2026, 11:32 AM", note:"Transfer received" },
      { id:"TXN-006", type:"Sent",     to:"WAL-003",   amount:150,  date:"21 May 2026, 04:00 PM", note:"Subscription" },
      { id:"TXN-007", type:"Received", from:"WAL-006", amount:400,  date:"19 May 2026, 10:15 AM", note:"Reward tokens" },
    ]
  },
  {
    id:"WAL-003", user:"Divya Menon",   userId:"USR-009", tokens:2500,  status:"Active",
    initials:"DM", color:"#F39C12",
    transactions:[
      { id:"TXN-008", type:"Sent",     to:"WAL-001",   amount:500,  date:"24 May 2026, 03:08 PM", note:"Payment for services" },
      { id:"TXN-009", type:"Received", from:"WAL-002", amount:150,  date:"21 May 2026, 04:02 PM", note:"Refund" },
      { id:"TXN-010", type:"Sent",     to:"WAL-005",   amount:300,  date:"18 May 2026, 01:00 PM", note:"Staking reward share" },
      { id:"TXN-011", type:"Received", from:"WAL-007", amount:1200, date:"15 May 2026, 09:30 AM", note:"Token purchase" },
    ]
  },
  {
    id:"WAL-004", user:"Lakshmi Iyer",  userId:"USR-011", tokens:540,   status:"Active",
    initials:"LI", color:"#8E44AD",
    transactions:[
      { id:"TXN-012", type:"Received", from:"WAL-001", amount:300,  date:"20 May 2026, 02:47 PM", note:"Merchant payment" },
      { id:"TXN-013", type:"Sent",     to:"WAL-006",   amount:100,  date:"17 May 2026, 05:00 PM", note:"Fee payment" },
    ]
  },
  {
    id:"WAL-005", user:"Priya Sharma",  userId:"USR-001", tokens:0,     status:"Deactivated",
    initials:"PS", color:"#6C63FF",
    transactions:[]
  },
  {
    id:"WAL-006", user:"Meera Nair",    userId:"USR-005", tokens:0,     status:"Deactivated",
    initials:"MN", color:"#E74C3C",
    transactions:[]
  },
  {
    id:"WAL-007", user:"Rahul Mehta",   userId:"USR-002", tokens:0,     status:"Deactivated",
    initials:"RM", color:"#FF6584",
    transactions:[
      { id:"TXN-014", type:"Sent",     to:"WAL-003",   amount:1200, date:"10 May 2026, 09:28 AM", note:"Token purchase" },
    ]
  },
];

export const auditLogs = [
  { id:1,  action:"KYC Approved",       user:"Vikram Singh",  admin:"Admin User", timestamp:"24 May 2026, 04:30 PM", details:"All documents verified and approved", type:"approve" },
  { id:2,  action:"KYC Rejected",       user:"Meera Nair",    admin:"Admin User", timestamp:"24 May 2026, 02:45 PM", details:"Documents unclear, details mismatch",  type:"reject"  },
  { id:3,  action:"KYC Approved",       user:"Karthik Rao",   admin:"Admin User", timestamp:"23 May 2026, 10:00 AM", details:"All documents verified and approved", type:"approve" },
  { id:4,  action:"User Account Created",user:"Priya Sharma", admin:"System",     timestamp:"20 May 2026, 09:00 AM", details:"New user registered on PayO",          type:"info"    },
  { id:5,  action:"Wallet Activated",   user:"Vikram Singh",  admin:"System",     timestamp:"24 May 2026, 04:35 PM", details:"Wallet activated post KYC approval",   type:"info"    },
  { id:6,  action:"KYC Rejected",       user:"Rohit Gupta",   admin:"Admin User", timestamp:"22 May 2026, 05:00 PM", details:"Images are cropped and not clear",     type:"reject"  },
  { id:7,  action:"KYC Approved",       user:"Divya Menon",   admin:"Admin User", timestamp:"23 May 2026, 08:30 AM", details:"All documents verified and approved", type:"approve" },
  { id:8,  action:"KYC Approved",       user:"Lakshmi Iyer",  admin:"Admin User", timestamp:"22 May 2026, 11:30 AM", details:"All documents verified and approved", type:"approve" },
  { id:9,  action:"Wallet Deactivated", user:"Meera Nair",    admin:"Admin User", timestamp:"24 May 2026, 03:00 PM", details:"Wallet deactivated pending re-verification", type:"reject" },
  { id:10, action:"Admin Login",        user:"—",             admin:"Admin User", timestamp:"25 May 2026, 09:00 AM", details:"Admin logged into the portal",         type:"info"    },
];

export const notifications = [
  { id:1, type:"kyc_request",  title:"New KYC Request",  message:"Priya Sharma submitted Aadhaar & PAN for review.",          time:"09:12 AM", read:false },
  { id:2, type:"kyc_request",  title:"New KYC Request",  message:"Rahul Mehta submitted Aadhaar & PAN for verification.",     time:"08:55 AM", read:false },
  { id:3, type:"kyc_approved", title:"KYC Approved",     message:"Ananya Reddy's KYC has been approved successfully.",        time:"09:45 AM", read:true  },
  { id:4, type:"kyc_rejected", title:"KYC Rejected",     message:"Neha Sharma's KYC was rejected — document mismatch.",      time:"09:15 AM", read:true  },
  { id:5, type:"kyc_request",  title:"New KYC Request",  message:"Arjun Patel submitted Aadhaar & PAN for verification.",    time:"12:05 PM", read:false },
  { id:6, type:"kyc_approved", title:"KYC Approved",     message:"Karthik Rao's KYC verification completed.",                time:"09:30 AM", read:true  },
  { id:7, type:"system",       title:"System Alert",     message:"245 KYC requests are currently pending review.",           time:"08:00 AM", read:false },
  { id:8, type:"kyc_rejected", title:"KYC Rejected",     message:"Rohit Gupta's documents rejected — images unclear.",       time:"05:00 PM", read:true  },
  { id:9, type:"kyc_request",  title:"New KYC Request",  message:"Aditya Kumar submitted Aadhaar & Passport for review.",    time:"03:30 PM", read:false },
];

export const monthlyData = [
  { month:"Jan", approved:620, rejected:45, pending:80  },
  { month:"Feb", approved:740, rejected:60, pending:95  },
  { month:"Mar", approved:810, rejected:55, pending:110 },
  { month:"Apr", approved:950, rejected:70, pending:130 },
  { month:"May", approved:1020,rejected:80, pending:245 },
];
