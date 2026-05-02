import asyncio
from backend.database import engine, Base, AsyncSessionLocal
from backend.models import Scenario, Question

SCENARIOS = [
    {
        "sender_email": "support@paypal-secure-update.com",
        "subject": "Action Required: Your Account is Limited",
        "email_body": "Dear Customer,\n\nWe noticed unusual activity on your account. Your access has been limited. Please click the link below to verify your identity and restore access.\n\nThank you,\nPayPal Security Team",
        "phishing_url": "http://paypal-secure-update.com/verify",
        "difficulty": "easy",
        "topic": "domain_spoofing",
        "question": {
            "question_text": "What is the primary indicator that this email is a phishing attempt?",
            "options": {
                "A": "The email creates a sense of urgency.",
                "B": "The sender's domain is spoofed and not the official 'paypal.com'.",
                "C": "The email uses a generic greeting 'Dear Customer'.",
                "D": "All of the above."
            },
            "correct_answer": "D",
            "explanation": "This email uses a combination of urgency, a spoofed domain (paypal-secure-update.com instead of paypal.com), and a generic greeting, which are classic phishing indicators."
        }
    },
    {
        "sender_email": "it-helpdesk@company-internal.com",
        "subject": "Mandatory Password Update",
        "email_body": "Hi Team,\n\nPlease be advised that due to a recent security policy change, all employees must update their passwords by end of day. Click the link to update your credentials immediately.\n\nRegards,\nIT Department",
        "phishing_url": "http://company-internal.com/login",
        "difficulty": "easy",
        "topic": "phishing_email",
        "question": {
            "question_text": "Why is this email suspicious?",
            "options": {
                "A": "IT departments rarely enforce password changes.",
                "B": "It demands immediate action without prior notice.",
                "C": "It includes a link to click for a password reset.",
                "D": "Both B and C."
            },
            "correct_answer": "D",
            "explanation": "IT departments usually have automated systems for password resets and rarely ask you to click a link in an email under sudden urgency."
        }
    },
    {
        "sender_email": "billing@netflix.com",
        "subject": "Payment Declined - Update Payment Info",
        "email_body": "Hi there,\n\nYour recent payment was declined. To continue enjoying Netflix, please update your payment details by clicking here: http://netflix-update-billing.xyz/login.\n\nIf you don't update within 24 hours, your account will be suspended.\n\nNetflix Team",
        "phishing_url": "http://netflix-update-billing.xyz/login",
        "difficulty": "medium",
        "topic": "url_detection",
        "question": {
            "question_text": "Examine the URL provided in the email. What makes it malicious?",
            "options": {
                "A": "It doesn't use HTTPS.",
                "B": "It uses a '.xyz' top-level domain instead of '.com'.",
                "C": "It includes the word 'netflix' but is not the official netflix.com domain.",
                "D": "All of the above."
            },
            "correct_answer": "D",
            "explanation": "The URL is HTTP instead of HTTPS, uses an unusual TLD (.xyz), and uses 'netflix' as a subdomain/hyphenated domain to trick the user."
        }
    },
    {
        "sender_email": "hr@yourcompany.com",
        "subject": "Updated Employee Benefits Policy 2024",
        "email_body": "Dear Employee,\n\nPlease find attached the updated Benefits Policy for 2024. You must review and sign the document by Friday.\n\nAttached: Employee_Benefits_2024.exe\n\nRegards,\nHR",
        "phishing_url": None,
        "difficulty": "easy",
        "topic": "attachment",
        "question": {
            "question_text": "What is the most dangerous element of this email?",
            "options": {
                "A": "The urgent deadline.",
                "B": "The attached file is an executable (.exe) file.",
                "C": "The email is from HR.",
                "D": "The generic greeting."
            },
            "correct_answer": "B",
            "explanation": "Executable files (.exe) attached to emails are highly suspicious and often contain malware. Legitimate policies are usually PDFs or Word documents."
        }
    },
    {
        "sender_email": "no-reply@amazon-support-desk.com",
        "subject": "Order Confirmation: MacBook Pro 16\"",
        "email_body": "Thank you for your order!\n\nYour order for a MacBook Pro 16\" ($2,499.00) has been processed. If you did not make this purchase, please click the link below to cancel the order and claim a refund.\n\nCancel Order: http://amazon-support-desk.com/refund\n\nAmazon Support",
        "phishing_url": "http://amazon-support-desk.com/refund",
        "difficulty": "medium",
        "topic": "phishing_email",
        "question": {
            "question_text": "What psychological trick is this phishing email using?",
            "options": {
                "A": "Fear of missing out.",
                "B": "Creating panic over a large, unauthorized purchase.",
                "C": "Promising a free reward.",
                "D": "Appealing to authority."
            },
            "correct_answer": "B",
            "explanation": "This email creates a false sense of urgency and panic by claiming a large purchase was made on your account, prompting you to react quickly without checking the sender."
        }
    },
    {
        "sender_email": "admin@microsoft.com",
        "subject": "Security Alert: Unusual sign-in activity",
        "email_body": "We detected something unusual about a recent sign-in to your Microsoft account. \n\nSign-in details:\nCountry/region: Russia\nIP address: 192.168.1.1\n\nIf this wasn't you, please secure your account by navigating to: http://login.microsoft.security-check.com/auth\n\nThanks,\nThe Microsoft account team",
        "phishing_url": "http://login.microsoft.security-check.com/auth",
        "difficulty": "hard",
        "topic": "domain_spoofing",
        "question": {
            "question_text": "Look closely at the link provided. Is it a legitimate Microsoft domain?",
            "options": {
                "A": "Yes, it starts with login.microsoft.",
                "B": "No, the actual domain being visited is 'security-check.com'.",
                "C": "Yes, Microsoft often uses security-check.com.",
                "D": "No, because it contains the word 'auth'."
            },
            "correct_answer": "B",
            "explanation": "In a URL, the actual domain is the one directly preceding the top-level domain (.com). Here, the domain is 'security-check.com', and 'login.microsoft' is just a subdomain created by the attacker to make it look legitimate."
        }
    },
    {
        "sender_email": "ceo@company.com",
        "subject": "URGENT: Wire Transfer Needed",
        "email_body": "Hi,\n\nI'm tied up in a meeting and need you to process a wire transfer to a new vendor immediately. This is highly confidential. Please reply so I can send you the account details.\n\nThanks,\nCEO",
        "phishing_url": None,
        "difficulty": "medium",
        "topic": "phishing_email",
        "question": {
            "question_text": "This is an example of what kind of attack?",
            "options": {
                "A": "Ransomware",
                "B": "Business Email Compromise (BEC) / CEO Fraud",
                "C": "Malware distribution",
                "D": "Man-in-the-middle"
            },
            "correct_answer": "B",
            "explanation": "This is a classic Business Email Compromise (BEC) attack where an attacker impersonates a high-level executive to trick an employee into transferring funds."
        }
    },
    {
        "sender_email": "service@fedex.com",
        "subject": "Delivery Attempt Failed - Tracking #99381723",
        "email_body": "Hello,\n\nWe were unable to deliver your parcel today because nobody was present to sign for it. \n\nPlease download the attached receipt and take it to your local post office to claim your package.\n\nAttachment: Delivery_Receipt.zip\n\nFedEx Customer Service",
        "phishing_url": None,
        "difficulty": "medium",
        "topic": "attachment",
        "question": {
            "question_text": "Why should you NOT open the attached Delivery_Receipt.zip?",
            "options": {
                "A": "Because FedEx doesn't deliver packages.",
                "B": "Because ZIP files can hide malicious executable files inside them.",
                "C": "Because the tracking number is fake.",
                "D": "Because you didn't order anything."
            },
            "correct_answer": "B",
            "explanation": "Attackers often use .zip archives to compress and hide malicious files (like .exe or .js) to bypass basic email filters. Always be wary of unsolicited attachments."
        }
    },
    {
        "sender_email": "alert@chase-bank.com",
        "subject": "Important Account Update",
        "email_body": "Dear Customer,\n\nWe are updating our security systems. To ensure your account is not disabled, you must login and verify your information at the following secure portal: https://www.chase.com.update-portal.net/login\n\nThank you,\nChase Bank",
        "phishing_url": "https://www.chase.com.update-portal.net/login",
        "difficulty": "hard",
        "topic": "url_detection",
        "question": {
            "question_text": "What is the true destination of the link provided in the email?",
            "options": {
                "A": "chase.com",
                "B": "update-portal.net",
                "C": "chase.bank.com",
                "D": "login.com"
            },
            "correct_answer": "B",
            "explanation": "The domain is 'update-portal.net'. The 'www.chase.com' part is merely a subdomain to trick users into thinking they are visiting the legitimate bank's site."
        }
    },
    {
        "sender_email": "docusign-noreply@d0cusign.com",
        "subject": "Please review and sign: Confidential NDA",
        "email_body": "You have a document to review and sign.\n\nSender: Legal Department\nDocument: Confidential_NDA_2024.pdf\n\nClick the link below to access the secure document:\nhttp://docusign-secure-login.com/auth\n\nPowered by DocuSign",
        "phishing_url": "http://docusign-secure-login.com/auth",
        "difficulty": "hard",
        "topic": "domain_spoofing",
        "question": {
            "question_text": "Identify the spoofing technique used in the sender's email address.",
            "options": {
                "A": "Subdomain manipulation.",
                "B": "Typosquatting (using a zero '0' instead of an 'o').",
                "C": "Email header injection.",
                "D": "Display name spoofing."
            },
            "correct_answer": "B",
            "explanation": "The sender's domain is 'd0cusign.com' (with a zero), not 'docusign.com'. This technique is known as typosquatting, designed to look identical at a quick glance."
        }
    }
]

async def seed_database():
    async with engine.begin() as conn:
        # Create tables
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        for s_data in SCENARIOS:
            q_data = s_data.pop("question")
            
            scenario = Scenario(**s_data)
            session.add(scenario)
            await session.commit()
            await session.refresh(scenario)
            
            question = Question(
                scenario_id=scenario.id,
                **q_data
            )
            session.add(question)
            await session.commit()
            
        print("Database seeded with 10 scenarios and questions.")

if __name__ == "__main__":
    asyncio.run(seed_database())
