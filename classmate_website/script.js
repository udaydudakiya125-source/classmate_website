// Mobile Hamburger Menu Toggle
function toggleMenu()
{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
}

// Contact Form Submission Handler (For contact.html)
function handleContactSubmit(e) 
{
    e.preventDefault(); // Prevent page reload
    const successMsg = document.getElementById('contact-success');
    if (successMsg) 
    {
        successMsg.style.display = 'block';
        document.getElementById('contact-form').reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// Apply Now Form Submission Handler (For apply.html)
function handleApplySubmit(e) {
    e.preventDefault(); // Prevent page reload
    const successMsg = document.getElementById('apply-success');
    if (successMsg) {
        successMsg.style.display = 'block';
        document.getElementById('apply-form').reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}
// Mobile Hamburger Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
}

// =========================================
// CONTACT FORM SUBMISSION
// =========================================
function handleContactSubmit(e) {
    e.preventDefault(); // Stops the FormSubmit "Thanks" page from opening
    
    const form = e.target;
    const data = new FormData(form);

    // Send the data quietly in the background
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json' // Tells FormSubmit we want a quiet response
        }
    }).then(response => {
        if (response.ok) {
            // 1. Show the success message
            const successMsg = document.getElementById('contact-success');
            if (successMsg) successMsg.style.display = 'block';
            
            // 2. Clear the form
            form.reset(); 
            
            // 3. Wait 1.5 seconds, then redirect to Home Page
            setTimeout(() => { 
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            alert("Oops! There was a problem submitting your message.");
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your message.");
    });
}


// =========================================
// APPLY NOW FORM SUBMISSION
// =========================================
function handleApplySubmit(e) {
    e.preventDefault(); // Stops the FormSubmit "Thanks" page from opening
    
    const form = e.target;
    const data = new FormData(form);

    // Send the data quietly in the background
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json' // Tells FormSubmit we want a quiet response
        }
    }).then(response => {
        if (response.ok) {
            // 1. Show the success message
            const successMsg = document.getElementById('apply-success');
            if (successMsg) successMsg.style.display = 'block';
            
            // 2. Clear the form
            form.reset(); 
            
            // 3. Wait 1.5 seconds, then redirect to Home Page
            setTimeout(() => { 
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            alert("Oops! There was a problem saving your entry.");
        }
    }).catch(error => {
        alert("Oops! There was a problem saving your entry.");
    });
}
/* =========================================
   ACTIVITY PAGE LOGIC
   ========================================= */

// 1. Gallery Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const filterItems = document.querySelectorAll('.filter-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// 2. Modal Logic (Mock Data for demonstration)
const modalData = {
    fingerPainting: { title: "Finger Painting", category: "Creative Arts", desc: "Expressing creativity and developing fine motor skills through colorful, tactile art sessions. Kids love exploring colors!", time: "Mon & Wed, 10:00 AM", loc: "Art Corner", adv: "Ms. Lily", ach: "<li>Annual Finger Paint Exhibition</li><li>Color Recognition Mastery</li>" },
    storytime: { title: "Interactive Storytime", category: "Cognitive & Sensory", desc: "Immersive storytelling sessions that build vocabulary, listening skills, and imagination with interactive props.", time: "Tues & Thurs, 11:00 AM", loc: "Reading Nook", adv: "Mr. Tom", ach: "<li>Vocabulary Expansion</li><li>Active Listening Skills</li>" },
    athletes: { title: "Little Athletes", category: "Physical Play", desc: "Fun, guided physical activities focusing on gross motor skills, balance, and teamwork in a safe environment.", time: "Mon, Wed, Fri, 9:00 AM", loc: "Playground", adv: "Coach Sarah", ach: "<li>Improved Balance & Coordination</li><li>Teamwork Basics</li>" },
    sensory: { title: "Sensory Bins", category: "Cognitive & Sensory", desc: "Hands-on play with different safe textures (sand, water, beads) to stimulate sensory development and spatial awareness.", time: "Fridays, 10:30 AM", loc: "Discovery Lab", adv: "Ms. Chloe", ach: "<li>Sensory Processing</li><li>Fine Motor Development</li>" },
    music: { title: "Music & Rhythm", category: "Creative Arts", desc: "Discovering beats, sounds, and simple instruments to foster a love for music and auditory skills.", time: "Tuesdays, 9:30 AM", loc: "Music Room", adv: "Mr. Ben", ach: "<li>Rhythm Recognition</li><li>Joyful Expression</li>" },
    blocks: { title: "Building Blocks", category: "Physical Play", desc: "Spatial reasoning and creativity meet as kids build towers, castles, and bridges using soft blocks.", time: "Thursdays, 1:00 PM", loc: "Play Room", adv: "Ms. Emma", ach: "<li>Spatial Awareness</li><li>Creative Problem Solving</li>" }
};

const modalOverlay = document.getElementById('activity-modal');

function openModal(activityId) {
    if (!modalOverlay) return; // Guard clause if not on activity page

    const data = modalData[activityId];
    if (data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-category').innerText = data.category;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-time').innerText = data.time;
        document.getElementById('modal-location').innerText = data.loc;
        document.getElementById('modal-advisor').innerText = data.adv;
        document.getElementById('modal-achievements-list').innerHTML = data.ach;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }
}

// Close modal when clicking outside of it
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// =========================================
// HOME PAGE DYNAMIC VIEWER
// =========================================
function swapInfo(event, viewId) {
    event.preventDefault(); 
    
    // Hide all panels
    const panels = document.querySelectorAll('.info-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    
    // Show the requested panel and scroll to it
    const activePanel = document.getElementById(viewId);
    if (activePanel) {
        activePanel.classList.add('active');
        activePanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// =========================================
// CUSTOM SELECT DROPDOWN LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const selects = document.querySelectorAll("select.select-blue");
    
    selects.forEach(select => {
        // Hide native select but keep it focusable for HTML5 form validation
        select.style.position = "absolute";
        select.style.opacity = "0";
        select.style.pointerEvents = "none";
        select.style.height = "0";
        
        // Create custom wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "custom-select-wrapper";
        wrapper.style.position = "relative";
        wrapper.style.width = "100%";
        
        // Insert wrapper before select and move select into it
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        
        // Create the trigger box (Looks exactly like the original select input)
        const trigger = document.createElement("div");
        trigger.className = "form-input select-blue custom-select-trigger";
        trigger.style.display = "flex";
        trigger.style.alignItems = "center";
        trigger.style.boxSizing = "border-box";
        trigger.innerHTML = `<span>${select.options[select.selectedIndex].text}</span>`;
        wrapper.appendChild(trigger);
        
        // Create the dropdown options box
        const optionsBox = document.createElement("div");
        optionsBox.className = "custom-options-box";
        
        // Populate the custom options
        Array.from(select.options).forEach((option, index) => {
            if (index === 0 && option.disabled) return; // Skip placeholder
            
            const optDiv = document.createElement("div");
            optDiv.className = "custom-option";
            optDiv.innerText = option.text;
            
            // When an option is clicked
            optDiv.addEventListener("click", function(e) {
                e.stopPropagation(); // prevent bubbling to trigger
                select.value = option.value; // Update the real hidden select
                trigger.querySelector("span").innerText = option.text; // Update text
                optionsBox.classList.remove("show"); // Close box
                wrapper.classList.remove("open"); // Update border status
            });
            optionsBox.appendChild(optDiv);
        });
        
        wrapper.appendChild(optionsBox);
        
        // Toggle open/close when clicking the box
        trigger.addEventListener("click", function() {
            // Close any other open dropdowns first
            document.querySelectorAll(".custom-select-wrapper.open").forEach(w => {
                if (w !== wrapper) {
                    w.classList.remove("open");
                    w.querySelector(".custom-options-box").classList.remove("show");
                }
            });
            wrapper.classList.toggle("open");
            optionsBox.classList.toggle("show");
        });
        
        // The Fix: Close the box ONLY when the pointer leaves the wrapper
        wrapper.addEventListener("mouseleave", function() {
            wrapper.classList.remove("open");
            optionsBox.classList.remove("show");
        });

        // Prevent page scroll when hovering the open dropdown to allow smooth inner scrolling
        wrapper.addEventListener("wheel", function(e) {
            if (optionsBox.classList.contains("show")) {
                const box = optionsBox;
                const isAtTop = box.scrollTop === 0;
                const isAtBottom = box.scrollTop + box.clientHeight >= box.scrollHeight;
                
                // Prevent page scroll if hovering trigger, or if options box is at scroll limits
                if (!e.target.closest(".custom-options-box") || (e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    e.preventDefault();
                }
            }
        }, { passive: false });
    });

    // Mobile fallback: Close when clicking somewhere else on the page
    document.addEventListener("click", function(e) {
        if (!e.target.closest(".custom-select-wrapper")) {
            document.querySelectorAll(".custom-select-wrapper.open").forEach(w => {
                w.classList.remove("open");
                w.querySelector(".custom-options-box").classList.remove("show");
            });
        }
    });
});

// =========================================
// DYNAMIC LIVE EVENTS LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    // Master list of events (Extend this list as far into the future as you want)
    const schoolEvents = [
        { date: "2026-05-10", endStr: "2026-05-10", title: "Mother's Day Event", desc: "Main Quad • 10:00 AM", tag: "Event", displayDate: "May 10", month: "MAY", day: "10" },
        { date: "2026-06-05", endStr: "2026-06-05", title: "World Environment Day", desc: "Campus Gardens • 9:00 AM", tag: "Activity", displayDate: "Jun 5", month: "JUN", day: "05" },
        { date: "2026-08-15", endStr: "2026-08-15", title: "Independence Day", desc: "Main Campus • 8:00 AM", tag: "Holiday", displayDate: "Aug 15", month: "AUG", day: "15" },
        { date: "2026-09-05", endStr: "2026-09-05", title: "Teacher's Day", desc: "Auditorium • 11:00 AM", tag: "Event", displayDate: "Sep 5", month: "SEP", day: "05" },
        { date: "2026-10-02", endStr: "2026-10-06", title: "Autumn Break", desc: "No Classes", tag: "Break", displayDate: "Oct 2 - 6", month: "OCT", day: "02" },
        { date: "2026-11-12", endStr: "2026-11-12", title: "Diwali Holiday", desc: "No Classes", tag: "Holiday", displayDate: "Nov 12", month: "NOV", day: "12" },
        { date: "2026-12-25", endStr: "2027-01-02", title: "Winter Vacation", desc: "Campus Closed", tag: "Break", displayDate: "Dec 25 - Jan 2", month: "DEC", day: "25" },
        { date: "2027-01-26", endStr: "2027-01-26", title: "Republic Day", desc: "Main Quad • 8:30 AM", tag: "Holiday", displayDate: "Jan 26", month: "JAN", day: "26" },
        { date: "2027-03-25", endStr: "2027-03-25", title: "Holi Celebration", desc: "Main Quad • 10:00 AM", tag: "Event", displayDate: "Mar 25", month: "MAR", day: "25" },
        { date: "2027-04-15", endStr: "2027-04-15", title: "Annual Sports Day", desc: "Stadium • 9:00 AM", tag: "Athletics", displayDate: "Apr 15", month: "APR", day: "15" }
    ];

    // Get today's date (at midnight, for fair comparison)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Filter out past events & Sort chronologically
    let upcomingEvents = schoolEvents.filter(event => {
        const eventEndDate = new Date(event.endStr + "T00:00:00");
        return eventEndDate >= today;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Take only the next 5 events
    const eventsToShow = upcomingEvents.slice(0, 5);

    // 3. Populate Home Page Calendar (if we are on index.html)
    const holidayList = document.getElementById("dynamic-holiday-list");
    if (holidayList) {
        eventsToShow.forEach(ev => {
            holidayList.innerHTML += `<li><strong>${ev.displayDate}:</strong> <span>${ev.title}</span></li>`;
        });
    }

    // 4. Populate Activity Page Event List (if we are on activity.html)
    const activityEventList = document.getElementById("dynamic-event-list");
    if (activityEventList) {
        eventsToShow.forEach(ev => {
            activityEventList.innerHTML += `<li><strong>${ev.displayDate}:</strong> <span>${ev.title}</span></li>`;
        });
    }
});

// =========================================
// FAQ ACCORDION LOGIC
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const faqQuestions = document.querySelectorAll(".faq-question");
    
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            // Close all other open answers
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.classList.remove("active");
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle the clicked one
            this.classList.toggle("active");
            const answer = this.nextElementSibling;
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});