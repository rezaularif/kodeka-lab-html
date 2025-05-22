document.addEventListener('DOMContentLoaded', function() {
    // Get all toggle buttons
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    // Add click event to each button
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the plan type (monthly or annual)
            const planType = this.getAttribute('data-plan');
            
            // Update pricing based on plan type
            updatePricing(planType);
        });
    });
    
    // Function to update pricing based on plan type
    function updatePricing(planType) {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            const priceElement = card.querySelector('.pricing-price h2');
            
            // Skip the Custom pricing card
            if (card.classList.contains('custom')) {
                return;
            }
            
            if (planType === 'monthly') {
                // Set monthly pricing
                if (card.querySelector('.pricing-header h3').textContent === 'MVP Starter') {
                    priceElement.innerHTML = '<span class="currency">$</span>2999<span class="period">/month</span>';
                } else if (card.querySelector('.pricing-header h3').textContent === 'Scale Up') {
                    priceElement.innerHTML = '<span class="currency">$</span>4999<span class="period">/month</span>';
                }
            } else {
                // Set annual pricing (10% discount for annual)
                if (card.querySelector('.pricing-header h3').textContent === 'MVP Starter') {
                    priceElement.innerHTML = '<span class="currency">$</span>32389<span class="period">/year</span>';
                } else if (card.querySelector('.pricing-header h3').textContent === 'Scale Up') {
                    priceElement.innerHTML = '<span class="currency">$</span>53989<span class="period">/year</span>';
                }
            }
        });
    }
});
