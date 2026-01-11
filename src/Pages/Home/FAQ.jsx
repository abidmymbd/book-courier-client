import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
    {
        question: "How does Book Courier work?",
        answer: "Book Courier connects users with nearby libraries. You can request a book pickup or delivery, and our platform ensures fast and secure handling without you visiting the library."
    },
    {
        question: "Can I request multiple books at once?",
        answer: "Yes! You can add multiple books to your order and request them together. Our system will schedule deliveries efficiently."
    },
    {
        question: "Is there a membership fee?",
        answer: "No. Book Courier is free to use for all readers, students, and researchers. Some libraries may have their own borrowing rules."
    },
    {
        question: "How do I track my orders?",
        answer: "You can track your current and past orders in the Dashboard under 'My Orders'. Statuses include pending, delivered, and cancelled."
    },
    {
        question: "Can I review books I haven't borrowed?",
        answer: "No. Only users who have ordered a book can leave reviews. This ensures feedback is authentic and trustworthy."
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="text-center mb-12">
                <p className="text-secondary text-lg">FAQ</p>
                <h2 className="text-primary text-4xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow hover:shadow-2xl transition cursor-pointer"
                        onClick={() => toggleFAQ(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-800 font-semibold text-lg">{item.question}</h3>
                            {openIndex === index ? (
                                <FaChevronUp className="text-primary text-xl" />
                            ) : (
                                <FaChevronDown className="text-primary text-xl" />
                            )}
                        </div>

                        {openIndex === index && (
                            <p className="text-gray-600 mt-4">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQ;
