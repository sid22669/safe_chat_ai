import pandas as pd
import os

def prepare_dataset():
    """Download SMS Spam Collection and augment with extra categories."""

    url = "https://raw.githubusercontent.com/justmarkham/pycon-2016-tutorial/master/data/sms.tsv"
    sms = pd.read_csv(url, sep='\t', header=None, names=['label', 'text'])
    sms['label'] = sms['label'].map({'ham': 'Normal', 'spam': 'Spam'})

    harassment = [
        "You are absolutely worthless and nobody wants you here. Leave now or else.",
        "I know where you live. You better watch your back. This is your last warning.",
        "Nobody likes you. Everyone is talking about how pathetic you are behind your back.",
        "You're so ugly I can't even look at you. Do everyone a favor and disappear.",
        "I will make your life a living hell if you don't do what I say.",
        "You're a complete waste of space. The world would be better without you.",
        "I'm going to find you and make you pay for what you did.",
        "You stupid idiot, you can't do anything right. Just give up already.",
        "Watch yourself. I know people who can make problems for you.",
        "You're disgusting and everyone hates you. Why don't you just leave?",
        "I'll destroy your reputation. Everyone will know what a loser you are.",
        "You think you're safe? Think again. I have your address.",
        "No one cares about your opinion. Shut up and go away forever.",
        "You're the most pathetic person I've ever met. Everyone laughs at you.",
        "I'm going to ruin everything you care about. Just wait and see.",
        "You deserve every bad thing that happens to you. Karma is coming.",
        "Stay away from my friends or you'll regret it. This is not a joke.",
        "You're a terrible person and everyone secretly despises you.",
        "I hope something terrible happens to you. You deserve nothing but pain.",
        "Keep talking and see what happens. I dare you to say one more word.",
        "You make me sick. The sight of you is revolting to everyone.",
        "I will expose all your secrets if you don't do exactly what I want.",
        "You're nothing. Absolutely nothing. And you always will be nothing.",
        "Don't think I won't find you. I always get what I want.",
        "Everyone is better than you. You're at the bottom of the barrel.",
        "I'll make sure you never work in this town again.",
        "Your family must be so ashamed of you. What a disappointment.",
        "Tick tock. Your time is running out. Better start running.",
        "You're a fraud and I'm going to tell everyone the truth about you.",
        "I've been watching you. I know your routine. Be very careful.",
    ]

    scam = [
        "URGENT: Your account has been compromised. Click this link immediately to verify your identity.",
        "Congratulations! You have won $1,000,000 in our lottery. Send your bank details to claim.",
        "DOUBLE your Bitcoin in 24 hours GUARANTEED! Limited spots available. Invest now!",
        "Your package is being held at customs. Pay $4.99 processing fee to release it: bit.ly/pkg123",
        "IRS NOTICE: You owe $5,432 in back taxes. Pay immediately to avoid arrest. Call 555-0199.",
        "Your Apple ID has been locked. Verify your identity here to restore access immediately.",
        "You've been selected for a $500 Walmart gift card! Complete this survey to claim: bit.ly/wm500",
        "FINAL WARNING: Your bank account will be suspended. Update your information now.",
        "Dear customer, unusual activity detected on your account. Login here to secure it.",
        "You have an unclaimed inheritance of $2.5 million from a distant relative in Nigeria.",
        "Your Netflix subscription has expired. Update payment to avoid losing your account.",
        "ALERT: Someone tried to access your PayPal. Verify your identity: paypa1-secure.com",
        "Congratulations! Your phone number was randomly selected to win a brand new Tesla!",
        "Your Social Security number has been compromised. Call 555-0177 immediately.",
        "Make $10,000 per week from home! No experience needed. Reply YES to get started.",
        "URGENT: Your computer has been infected with a virus. Call Microsoft support: 555-0188.",
        "You've won a free cruise vacation! Claim your tickets before midnight tonight!",
        "Your Amazon order #12345 cannot be delivered. Update your address and payment info here.",
        "IMPORTANT: Your credit score has dropped 200 points. Check now at freescore-check.com",
        "We've detected suspicious transactions on your Visa card ending in 4821. Call now.",
        "You qualify for a government grant of $25,000. Apply now before funds run out!",
        "Your email account will be deleted in 24 hours unless you verify: verify-email-now.com",
        "Exclusive investment opportunity: 500% returns guaranteed in just 30 days!",
        "FINAL NOTICE: Legal action will be taken if you don't respond within 24 hours.",
        "You have a pending refund of $847.50. Enter your bank details to process it.",
        "Your phone has been hacked! Download our security app immediately to protect your data.",
        "Congratulations! You've been approved for a $50,000 loan at 0% interest. Apply now!",
        "WARNING: Your router has been compromised. Call tech support at 555-0166 immediately.",
        "You've been chosen for our exclusive Bitcoin mining program. Earn $5000 daily!",
        "URGENT TAX NOTICE: Pay your overdue taxes of $3,299 or face criminal prosecution.",
    ]

    promotional = [
        "EXCLUSIVE OFFER! Get 50% OFF all products TODAY ONLY! Click here: bit.ly/deals123",
        "Limited time offer! Subscribe now and get 3 months FREE. Best deal of the year!",
        "New arrivals this week! Check out our latest collection and enjoy free shipping over $50.",
        "Special discount just for you! Use code SAVE20 for 20% off your next purchase.",
        "Flash sale starts NOW! Up to 70% off on selected items. Don't miss out!",
        "Hey! We miss you. Come back and get 15% off your next order with code WELCOME15.",
        "Black Friday deals are HERE! Save up to 80% on everything in store.",
        "Free shipping on ALL orders this weekend only! No minimum purchase required.",
        "NEW: Our bestselling product is back in stock! Order now before it sells out again.",
        "Loyalty reward! You've earned 500 points. Redeem them for a $25 gift card today!",
        "Summer sale! Buy 2 get 1 free on all clothing items. Shop now!",
        "Your cart is waiting! Complete your purchase and get 10% off with code FINISH10.",
        "Introducing our premium membership. Join today and get exclusive perks and discounts.",
        "Weekend special: All pizzas are buy one get one free! Order online now.",
        "Upgrade your plan today and save 30%. Premium features at basic prices!",
        "Just launched: New spring collection 2026. Be the first to shop the latest trends.",
        "Happy hour deal! 40% off all drinks from 4-7 PM. Show this message at checkout.",
        "Annual clearance sale! Everything must go. Prices slashed up to 90% off.",
        "Refer a friend and both get $20 credit! Share your unique code now.",
        "Birthday special! Enjoy a FREE dessert on us when you dine in this week.",
        "Early bird discount: Book your summer vacation now and save 25% on all packages.",
        "Members-only preview sale starts tomorrow! Get first access to our newest arrivals.",
        "Download our app and get $10 off your first order. Available on iOS and Android.",
        "Last chance! Cyber Monday deals end at midnight. Save big on electronics and more.",
        "VIP exclusive: Private shopping event this Saturday. RSVP now for 40% off everything.",
        "New customer? Get your first month free! No credit card required to start.",
        "Bundle deal: Buy the complete set and save $50. Limited stock available.",
        "Thanks for being a loyal customer! Here is an exclusive 35% off coupon just for you.",
        "Pre-order now and get a FREE bonus gift worth $30. Ships next week!",
        "Season finale sale! Last chance to grab winter styles at 60% off before they are gone.",
    ]

    aug_data = (
        [(text, 'Harassment') for text in harassment] +
        [(text, 'Scam') for text in scam] +
        [(text, 'Promotional') for text in promotional]
    )
    aug_df = pd.DataFrame(aug_data, columns=['text', 'label'])

    dataset = pd.concat([sms[['text', 'label']], aug_df], ignore_index=True)
    dataset = dataset.sample(frac=1, random_state=42).reset_index(drop=True)

    os.makedirs('data', exist_ok=True)
    dataset.to_csv('data/dataset.csv', index=False)
    print(f"Dataset saved: {len(dataset)} samples")
    print(dataset['label'].value_counts())

if __name__ == '__main__':
    prepare_dataset()
