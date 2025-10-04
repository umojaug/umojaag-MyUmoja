export const FaqList = {
  General: [
    {
      id: "1001",
      question: "What is Sobhisab?",
      answer:
        "Sobhisab is an accounting software implemented novel data structures and algorithms and runs on modern cloud infrastructure, helping you to accomplish accounting tasks accurately and efficiently anywhere. With an Internet connection, you can access Sobhisab from a browser on all devices or install Sobhisab as an app.",
    },
    {
      id: "1002",
      question: "Does Sobhisab free tier include all features?",
      answer:
        "Yes, as a single user, you can use full features of Sobhisab for free. When you are happy with the service and want to use Sobhisab with multiple users or to provide accounting services, Sobhisab offers attractive fees per tax ID. Please see our fee schedule above.",
    },
    {
      id: "1003",
      question:
        " Can I import my data from other software or Excel into Sobhisab?",
      answer:
        "Yes, Sobhisab make it very easy to import data from other sources. We provide Excel template that you can download, and detailed instructions on how you can format your data in an Excel file to conform to the template. If you have any difficulty importing data, please don't hesitate to contact our telephone number 0707.499.660 or email us at support@Sobhisab.vn",
    },
    {
      id: "1004",
      question: "Can I export my data out of Sobhisab?",
      answer:
        "Yes, you can export all your data out as Excel files when you have an active account.",
    },
    {
      id: "1005",
      question: "Can I access Sobhisab on my mobile phone or tablet?",
      answer: `Yes, you can use Sobhisab on both your mobile phone and tablet by visiting "app.Sobhisab.vn" using Chrome (on Android devices) and Safari (on iPhones or iPads). You can also install Sobhisab on your device to startup faster and run fullscreen.`,
    },
    {
      id: "1006",
      question: "How do I install Sobhisab on Android phones and tablets?",
      answer: `Visit "app.Sobhisab.vn" using Chrome. Tap "Install" button on the bottom notification bar.
      `,
    },
    {
      id: "1007",
      question: "How do I install Sobhisab on iPhones and iPads?",
      answer: `Visit "app.Sobhisab.vn" using Safari. Tap "Share" button. Tap "Add to Home Screen". Tap "Add".
      `,
    },
    {
      id: "1008",
      question: "Does Sobhisab include free updates?",
      answer:
        "Yes, if you installed Sobhisab, you will automatically receive free software update whenever Sobhisab releases a new version. If you access Sobhisab online, it is always updated to the latest version.",
    },
    {
      id: "1009",
      question:
        "Does Sobhisab provide training program and technical assistance?",
      answer:
        "Please contact us via telephone number 0707.499.660 or our email support@Sobhisab.vn for free technical assistance. On-site training will be provided on a case-by-case basis.",
    },
  ],
  ServiceAvailability: [
    {
      id: "1010",
      question: "What is the level of availability of Sobhisab?",
      answer:
        "Sobhisab follows industry best practices to provide you with highly available (HA) services: Sobhisab runs on Amazon Web Services (AWS), one of the most modern and largest cloud service providers in the world. Inherently, there are redundancies for services provided on a cloud platform. In particular, AWS has committed at least 99.99% server uptime every month. Moreover, we set up additional redundancies for every component used to provide the service: from app servers, databases, and load balancers to DNS servers. This makes sure that any software error or hardware failure of any single component will not disrupt our service. As a result, you can be assured that Sobhisab will be available to accompany you anytime and anywhere.",
    },
    {
      id: "1011",
      question:
        "Will Sobhisab be slow when Internet optic cables have problems?",
      answer:
        "Minimal. Sobhisab optimizes data transfer so that it operates well under degraded international connections.",
    },
    {
      id: "1012",
      question: "Can I access Sobhisab without Internet?",
      answer: "No, you need an Internet connection to use Sobhisab.",
    },
  ],
  DataSecurityAndSafety: [
    {
      id: "1013",
      question: "How is my data secured?",
      answer:
        "Your data security is our top priority. We take extensive measures to make sure that your data is 100% encrypted. These measures include: Encryption at rest: Your data is stored 100% encrypted on disk. This means that, any third party who gets a hold of the hard drive or a copy of the data but does not have the encryption key, still cannot read your data. Encryption on the move: When data is transmitted over the Internet, it is also encrypted with HTTPS. HTTPS is used by the world's top banks. This is the method protects your data from any third party on the Internet. At our data center, when your data is transmitted among our own servers, they are also protected with TLS. This means that your data is also protected from anyone who can tap into the data centers network. Last but not least, Sobhisab's cloud service provider Amazon AWS follows strictly international security management standard that specifies security management best practices and comprehensive security controls. Amazon AWS has certifications for compliance with ISO/IEC 27001:2013, 27017:2015, and 27018:2014.",
    },
    {
      id: "1014",
      question: "How is my data safe?",
      answer:
        "Besides security, safety of your data is also of utmost important to us. To make sure your data is safe, we continuously replicate and store your data in an extensively careful manner: At Amazon AWS, one of the most reputable datacenters. On different time scales: in real time and every set hour. In total, your data is replicated at least 50 times. In summary, you will never have to worry about the safety of your data on Sobhisab",
    },
    {
      id: "1015",
      question: "What happen to my data after I stop using the service?",
      answer:
        "You can delete all accounting data that you created by yourself before you stop using the service. If you do not delete them, we will retain your data only up to 30 days and might delete them permanently. You can also request us to delete your accounting data immediately.",
    },
    {
      id: "1016",
      question: "What is data encryption at rest?",
      answer:
        "When your data is stored on a hard drive, it is normally not encrypted. Therefore, whoever gets a hold of your physical hard drive can read your data by simply plugging the hard drive into a different system. Encryption at rest means that data is stored as encrypted files, and from the perspective of the file system, they are just binary scrambled data. Using this method, any third party who gets a hold of the hard drive or a copy of the data but does not have the encryption key, still cannot read your data.",
    },
    {
      id: "1017",
      question: "What is HTTPS? How does Sobhisab use HTTPS?",
      answer:
        "When the web just started, HTTP protocol is the default protocol. Information sent using the protocol is plaintext and anyone who can capture packets can read the data. To protect sensitive information sent over the Internet, an extension of HTTTP was proposed, called HTTP Secure (HTTPS). In this version, HTTP data is encrypted (using TLS protocol) before sending, thus data is protected from eavesdropping. HTTPS is widely used today by many reputable websites including the world's top banks. To protect our customers, Sobhisab does not provide service over HTTP and only provide service over HTTPS. HTTPS is provided with strong 128-bit key, TLS 1.3, and Sobhisab' TLS/SSL certificate is provided by Let's Encrypt",
    },
  ],
  PaymentInformation: [
    {
      id: "1018",
      question: "How does Sobhisab service work and calculate fees?",
      answer:
        "Sobhisab is a post-paid online software service. This means that you can use our service first, and at the end of the month, we calculate a service fee for the past month. You need to pay this fee before you can continue using our service. We calculate the fee you need to pay per day, depending on your account type, number of users, and number of client companies. Please see the fee schedule above for details. At the end of the month, we sum the daily fees to get the monthly fee that you need to pay.",
    },
    {
      id: "1019",
      question: "What currency does Sobhisab take?",
      answer: "All transactions made on Sobhisab are in Vietnam Dong.",
    },
    {
      id: "1020",
      question: "What are the acceptable payment methods?",
      answer:
        "We are currently accepting the following payment methods: Direct bank transfer to the following bank account: Account number: 0181003628666. Account name: Cong ty TNHH Phan mem Le Anh Minh. Bank name: Vietcombank. Bank branch: Phu My Hung. Bank transfer note: Top up [user email]. ATM Card.",
    },
    {
      id: "1021",
      question: "Can I continue using Sobhisab immediately after my payment?",
      answer:
        "If you pay using bank transfer, then you need to inform us to credit your account. If you pay by ATM or Visa/Master/JCB/Amex cards, then you are credited right away. After your account is credited and the latest monthly fee is paid, you can continue using Sobhisab",
    },
    {
      id: "1022",
      question: "Does Sobhisab save my ATM or credit cards information?",
      answer:
        "No, we do not store your card information. We integrated VNPay, and card transactions are handled by VNPay.",
    },
    {
      id: "1023",
      question: "Can I get a refund after I stop using my service?",
      answer:
        "Yes, we handle refund on a case-by-case basis. A refund can be requested within 30 days of a deposit. And the amount of refund cannot exceed the current account balance. Please chat with us on this website, call us at 0707.499.600, or email us at support@Sobhisab.vn for assistance.",
    },
    {
      id: "1024",
      question: "What if I have other questions?",
      answer:
        "Please chat with us on this website, call us at 0707.499.600, or email us at support@Sobhisab.vn for assistance.",
    },
  ],
};
