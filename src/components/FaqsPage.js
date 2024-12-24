import React from 'react';

const FaqsPage = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/faqs">FAQs</a></li>
          </ul>
        </nav>
      </header>

      <section id="faqs">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <h3><b>Q1. What is the purpose of this website?</b></h3>
            <p>This website allows you to preorder food from the canteen, saving you time and reducing rush in the canteen.</p>
          </li>
          <li>
            <h3><b>Q2. How do I preorder food?</b></h3>
            <p>Simply browse our menu, select the items you'd like to order, and follow the checkout process.</p>
          </li>
          <li>
            <h3><b>Q3. Can I cancel or modify my order?</b></h3>
            <p>No, you cannot modify or change your order.</p>
          </li>
          <li>
            <h3><b>Q4. How do I pick up my order?</b></h3>
            <p>Once you've placed your order, you can pick it up at the designated time at the canteen. Please bring your order confirmation OTP to collect your order.</p>
          </li>
          <li>
            <h3><b>Q5. Is my personal and payment information secure?</b></h3>
            <p>Yes, our website uses industry-standard SSL encryption to ensure that your personal and payment information is secure and protected.</p>
          </li>
          <li>
            <h3><b>Q6. How do I contact customer support?</b></h3>
            <p>If you have any questions or concerns, please contact us through our website, mobile app, or email at <a href="mailto:pessupport@gmail.com">PESUsupport@gmail.com</a>. We're happy to help!</p>
          </li>
          <li>
            <h3><b>Q7. What are the payment options available?</b></h3>
            <p>We accept various payment options, including credit/debit cards, net banking, and online wallets.</p>
          </li>
          <li>
            <h3><b>Q8. Can I preorder food for a group?</b></h3>
            <p>Yes, you can preorder food for a group. Simply select the items you'd like to order and specify the number of people in your group during the checkout process.</p>
          </li>
          <li>
            <h3><b>Q9. How do I know if my order is confirmed?</b></h3>
            <p>Once you've placed your order, you will receive an order confirmation email and OTP. Please bring this OTP to collect your order.</p>
          </li>
          <li>
            <h3><b>Q10. Can I preorder food 5 mins before I collect it?</b></h3>
            <p>Yes, you can preorder food 5 mins before you collect it.</p>
          </li>
          <li>
            <h3><b>Q11. What if I forget my OTP?</b></h3>
            <p>If you forget your OTP, please contact our customer support team, and we will assist you in retrieving it.</p>
          </li>
          <li>
            <h3><b>Q12. Can I preorder food for a special diet?</b></h3>
            <p>Yes, we offer options for special diets, such as vegetarian, vegan, and gluten-free. Please select the relevant option during the checkout process.</p>
          </li>
          <li>
            <h3><b>Q13. How do I track my order?</b></h3>
            <p>You can track your order status through our website or mobile app.</p>
          </li>
          <li>
            <h3><b>Q14. What if I'm not satisfied with my order?</b></h3>
            <p>If you're not satisfied with your order, please contact our customer support team, and we will assist you in resolving the issue.</p>
          </li>
          <li>
            <h3><b>Q15. Can I preorder food for a delivery?</b></h3>
            <p>No, we currently do not offer delivery services. However, we are working on introducing this feature in the near future.</p>
          </li>
          <li>
            <h3><b>Q16. What are the operating hours of the canteen?</b></h3>
            <p>The canteen operates from 8:00 AM to 8:00 PM, Monday to Saturday. We are closed on Sundays and public holidays.</p>
          </li>
        </ul>
      </section>

      <footer>
        <p>&copy; 2024 Preorder Food from Canteen. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FaqsPage;