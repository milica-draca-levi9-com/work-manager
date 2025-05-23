# Night Train Navigator

Welcome to the Night Train Navigator! Your corporate life, but much easier!

**Sick Leave** – Feeling under the weather? Submit your sick leave with just a few clicks and get some rest!

**Education and Social Activities** – Want to learn something new, join a team-building event, or even organize one?

**Corporate Travel** – Got a meeting in another city? Arrange your flights and book your business trip.

**Maintenance Issues** – Got a flickering light or a broken pipe? Report it and let the fixers do their magic.

**Internal Asset Booking** – Need a company car, projector, or those awesome portable speakers? Book it all here!

**Expense Report** – Bought something for work? Snap the receipt, upload it, and get reimbursed in no time.

## 🧑‍💻 Development

### 🌐 Develop locally

- checkout the project from https://github.com/Levi9Hack9/night_train_repo
- install dependencies with `pnpm install`
- create `.env` file and paste Supabase configuration
- run in development mode with `pnpm dev`
- build with `pnpm build`
- deploy from `v0` dashboard with one click!

### 🌍 Try it out live

Your project is live at:

https://v0-web-app-dashboard-three.vercel.app/

---

# Features overview

## 🌡️ Sick Leave Management

This screen provides an overview of all your sick leave requests, allowing you to track their status and manage new requests.

### Navigating to Your Sick Leave

You can access this screen from your main Dashboard. To return to the Dashboard at any time, simply click the **< Back to Dashboard** link at the top left.

### Viewing Your Sick Leave History

All your past and present sick leave requests are displayed in a list format. For each request, you can see the following details:

- **Start Date:** The first day of your requested sick leave.
- **End Date:** The last day of your requested sick leave.
- **Reason:** The reason you provided for the leave (e.g., Migraine, Surgery recovery, Cold).
- **Attachment:** Indicates if any supporting documents (like a doctor's note) were attached. 'None' means no attachment was provided.
- **Status:** Shows the current status of your request.
  - **Approved:** Your request has been reviewed and approved.
  - **Pending:** Your request has been submitted but is awaiting review and approval.
- **Created:** The date you originally submitted the request.

### Searching and Filtering Your Requests

To easily find specific requests, you can use the search and filter options:

- **Search by Reason:** Type keywords into the "Search by reason..." bar to find requests based on the reason you provided.
- **Filter by Status:** Click the "All Statuses" dropdown menu to filter the list and view only requests with a specific status (e.g., show only 'Pending' or 'Approved' requests).

### Requesting New Sick Leave

To submit a new request for sick leave:

1.  Click the **+ Request Sick Leave** button located at the top right of the screen.
2.  A **Request Sick Leave** window will appear.
3.  Fill out the form with the following details:
    - **Start Date \*:** Click the calendar icon and select the first day of your sick leave. (This field is required).
    - **End Date \*:** Click the calendar icon and select the last day of your sick leave. (This field is required).
    - **Reason \*:** Provide a brief description of the reason for your sick leave in the text box. (This field is required).
    - **Attachment (Optional):** If you need to provide a supporting document (like a doctor's note), click **Choose file** and select the relevant document from your computer. Accepted file types are PDF, JPG, and PNG.
4.  Once you have filled in all the necessary information, click the **Submit Request** button.
5.  If you change your mind or want to exit without submitting, click **Cancel** or the **x** icon at the top right of the window.

Your new request will then be added to the list, typically with a 'Pending' status until it is reviewed. This screen ensures you have a clear and organized view of your sick leave, making it simple to manage your time off for health reasons.

# 🎓 Education & Social Activities

Welcome to the Education & Social Activities hub! This section is your go-to place for discovering, tracking, and signing up for upcoming educational workshops, training sessions, social gatherings, and team-building events within the company. Stay informed about opportunities to learn new skills, connect with colleagues, and participate in fun activities.

### Navigating the Hub

At the top of the screen, you'll find the main title "Education & Social Activities" and a link to navigate "← Back to Dashboard".

On the right side, you have two primary ways to view the events:

- **Grid View**: The default view, displaying events as individual cards.
- **Calendar View**: Displays events on a monthly calendar.

You can easily switch between these views by clicking the `Grid` or `Calendar` buttons.

### Grid View

The Grid View provides a quick overview of upcoming events in a card-based layout. Each card displays key information:

- **Event Title**: The name of the event (e.g., "Cybersecurity Best Practices", "Tech Trivia Night").
- **Category**: A tag indicating if it's an `Education` or `Social` event.
- **Attending Tag**: If you've signed up, an `Attending` tag will appear.
- **Brief Description**: A short summary of the event.
- **Date & Time**: When the event starts.
- **Location**: Where the event will take place (e.g., "Main Auditorium, Kyiv Office", "Virtual Meeting Room").
- **Duration**: How long the event is expected to last.
- **Attendees/Speakers**: Icons or names of key people involved.

### Calendar View

The Calendar View helps you visualize events over a month.

- Navigate through months using the `<` and `>` arrows or jump to `Today`.
- Events are shown as colored blocks on their respective dates. Click on an event block to see more details (functionality assumed, though not explicitly shown in detail).

### Filtering Events

To help you find relevant events quickly, use the filtering options located below the main title:

- **Filter by type**: Click the "All types" dropdown to select whether you want to see `Education` events, `Social` events, or `All types`.
- **Show only events I'm attending**: Check this box to hide events you haven't signed up for, making it easy to see your personal event schedule.

The "Showing X events" indicator on the right tells you how many events match your current filter settings.

### Viewing Event Details

To get more information about a specific event from the Grid View:

1.  Click anywhere on the event card.
2.  A pop-up window will appear, displaying comprehensive details:
    - **Full Title & Category**.
    - **Detailed Description**: A thorough explanation of the event's purpose, content, and target audience.
    - **Speakers (if applicable)**: Names of presenters or key figures.
    - **Date, Time, & Duration**.
    - **Full Location**.

### Attending an Event

Want to join an event? It's simple!

1.  Open the event details pop-up by clicking on an event card.
2.  Click the `Attend Event` button.
3.  Once clicked, the event will likely show the `Attending` tag in the Grid View, and it will appear when you filter for events you are attending.

We encourage you to explore the available activities and sign up for those that interest you!

# 💶 Expense Report Documentation

### Overview

The Expense Report screen allows you to manage and track all your business-related expenses. You can view a comprehensive list of past and pending expenses, add new expense claims, and monitor their approval status.

### Viewing Your Expenses

Upon navigating to the Expense Report screen, you will see a table listing all recorded expenses. The table provides the following details for each expense:

- **Purchase Date:** The date when the expense was incurred.
- **Description:** A brief explanation of the expense item (e.g., "Office supplies", "Client lunch").
- **Amount:** The monetary value of the expense.
- **Attachment:** Indicates if a receipt or invoice has been attached (currently shows "None"). _Future functionality might allow viewing attachments directly._
- **Status:** The current state of the expense report. Common statuses include:
  - `Approved`: The expense has been reviewed and approved.
  - `Pending`: The expense has been submitted and is awaiting review.
  - `Rejected`: The expense has been reviewed but not approved.
- **Created:** The date when the expense report was added to the system.

### Searching and Filtering Expenses

To quickly find specific expenses, you can use the search and filter options located above the expense list:

- **Search by description:** Enter keywords into this field to search for expenses based on their description. The list will update automatically to show matching results.
- **Filter by Status:** Click the "All Statuses" dropdown menu to filter the expense list based on its status (e.g., show only "Pending" or "Approved" expenses).

### Adding a New Expense

To submit a new expense for reimbursement or tracking, follow these steps:

1.  **Click the "+ Add Expense" Button:** This button is located in the top-right corner of the screen.
2.  **Fill out the "Add Expense Report" Form:** A pop-up window will appear with the following fields:
    - **Purchase Date:** (Required) Click the calendar icon to select the date the purchase was made. It defaults to the current date (e.g., May 23, 2025).
    - **Description:** (Required) Enter a clear and concise description of what the expense was for.
    - **Amount:** (Required) Enter the total amount of the expense.
    - **Receipt (Optional):** Click "Choose file" to upload a digital copy of your receipt or invoice. Supported file formats are PDF, JPG, and PNG. While optional, attaching a receipt is highly recommended for faster approval.
3.  **Submit the Expense:** Once you have filled in the required details and attached a receipt (if applicable), click the "Submit Expense" button.
4.  **Cancel:** If you decide not to add the expense, click the "Cancel" button to close the pop-up window without saving.

Once submitted, the new expense will appear in your Expense Report list, typically with a "Pending" status, awaiting review.

# 🔧 Maintenance Issues Dashboard

This document provides an overview of the Maintenance Issues dashboard, explaining how to view, filter, and report maintenance issues within the system.

The Maintenance Issues dashboard provides a centralized location to track and manage all reported maintenance problems across different locations. It allows users to see the status of existing issues and report new ones.

### Viewing Maintenance Issues

The main screen displays a table listing all reported maintenance issues.

### Features:

- **Back to Dashboard:** A link to navigate back to the main dashboard.
- **Filter by Issue Type:** You can filter the list to show only specific types of issues (e.g., Equipment Issue, Building Maintenance) or view all issue types.
- **Report an Issue Button:** Click this button to open the form for reporting a new maintenance issue.

### Issues Table:

The table provides a summary of each reported issue with the following columns:

- **Date:** The date the issue was reported.
- **Issue Type:** The category of the issue (e.g., Equipment Issue, Building maintenance). It includes an icon for quick visual identification.
- **Description:** A brief description of the reported problem.
- **Location:** The location where the issue occurred (e.g., Belgrade, Iasi, Novi Sad).
- **Assigned To:** The person or team assigned to resolve the issue.
- **Status:** The current status of the issue:
  - **Open:** The issue has been reported but not yet started.
  - **In Progress:** Someone is currently working on resolving the issue.
  - **Resolved:** The issue has been fixed and closed.

### Reporting a Maintenance Issue

To report a new maintenance issue, follow these steps:

1.  Click the **+ Report an Issue** button located at the top-right corner of the dashboard.
2.  This will open the "Report Maintenance Issue" form.

### Filling out the Form:

- **Date:** This field automatically defaults to the current date (e.g., May 23, 2025), but you can change it if necessary using the calendar picker.
- **Issue Type:** Select the most appropriate category for the issue from the dropdown list. This is a required field.
- **Location:** Choose the location where the issue exists from the dropdown list. This is a required field.
- **Description:** Provide a detailed description of the issue. Be as specific as possible to help the maintenance team understand the problem. This is a required field.

### Submitting the Form:

- Once you have filled out all the required fields, click the **Submit Issue** button. The issue will be added to the Maintenance Issues list.
- If you decide not to report the issue, click the **Cancel** button to close the form without saving.

# 🚙 Internal Asset Booking User Guide

Welcome to the Internal Asset Booking system! This guide will help you understand how to view existing asset bookings and how to book an asset for your own use.

The Internal Asset Booking system provides a central place to manage and track the borrowing and returning of company assets. The main screen gives you an at-a-glance view of all booked assets.

### Key Features:

- **View Bookings:** See a list of all assets that have been booked.
- **Filter Assets:** Narrow down the list to see bookings for specific types of assets.
- **Book an Asset:** Easily reserve an asset for a specific period.

### Viewing Asset Bookings

The main screen displays a list of all asset bookings. Each row represents a single booking and shows the following details:

- **Asset Type:** The kind of asset booked (e.g., Mobile phone, Projector, Laptop, Speaker, Car, TV, WiFi Router, Bike), usually accompanied by an icon.
- **Borrow Date:** The date when the asset is scheduled to be picked up or starts being used.
- **Return Date:** The date when the asset is scheduled to be returned.
- **Duration:** The total length of the booking period (e.g., in days).
- **Created:** The date when the booking was originally entered into the system.

### Filtering the Booking List

If you're looking for a specific type of asset, you can filter the list:

1.  Locate the **All Asset Types** dropdown menu at the top-left of the booking list.
2.  Click on the dropdown.
3.  Select the asset type you are interested in from the list.
4.  The booking list will automatically update to show only the bookings for the selected asset type.

### How to Book an Asset

To reserve an asset for your use, follow these steps:

1.  Click the **+ Book Asset** button, located in the top-right corner of the screen.

2.  A **Book Asset** pop-up window will appear.

3.  **Fill out the form:**

    - **Asset Type \*:** Click the dropdown menu and select the type of asset you need to book (e.g., 'Car'). This field is required.
    - **Borrow Date \*:** Click the calendar icon and select the date you wish to start using the asset. This field is required.
    - **Return Date \*:** Click the calendar icon and select the date you plan to return the asset. This field is required.

4.  **Confirm your booking:**
    - Once you have selected the asset type and dates, click the **Book Asset** button at the bottom-right of the window.
    - If you need to start over or decide not to book, click the **Cancel** button.

Once confirmed, your booking will be added to the Internal Asset Booking list. Please ensure you pick up and return the asset on the scheduled dates.
