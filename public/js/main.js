$(document).ready(function () {
    // Fetch data from Numbers API (Random fact for today)
    $.ajax({
        url: 'http://numbersapi.com/1/30/date?json',
        type: 'GET',
        success: function (response) {
            // Write the response to #fact-box
            $('#fact-box').html(response.text);
        },
        error: function () {
            $('#fact-box').html('<em>Failed to load data. Try again later!</em>');
        }
    });

    // Drag and drop image upload functionality
    $('#drop-zone').on('click', function () {
        console.log('Drop zone clicked ✅');
        $('#file-input')[0].click(); // Open file dialog on click
    });

    // Handle image drag & drop
    $('#drop-zone').on('dragover', function (e) {
        e.preventDefault(); // Prevent default behavior (open as link for some browsers)
        $(this).addClass('bg-light');
    }).on('dragleave', function () {
        $(this).removeClass('bg-light');
    }).on('drop', function (e) {
        e.preventDefault();
        $(this).removeClass('bg-light');
        var files = e.originalEvent.dataTransfer.files;
        handleFileUpload(files[0]);
    });

    // Handle file selection from input
    $('#file-input').on('change', function (e) {
        var files = e.target.files;
        console.log("Selected file:", files[0]);
        handleFileUpload(files[0]);
    });

    // Handle file upload to the server
    function handleFileUpload(file) {
        var formData = new FormData();
        formData.append('image', file);

        $.ajax({
            url: '/upload',  // We'll create this endpoint in Node.js
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#upload-status').text('Image uploaded successfully: ' + response.filename);
            },
            error: function () {
                $('#upload-status').text('Error uploading image!');
            }
        });
    }
});

document.querySelectorAll('.show-toast').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const toastLive = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLive);
        toast.show();
    });
});

// Intersection Observer Setup
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active'); // Add class on scroll
        }
    });
}, { threshold: 0.5 }); // 50% element visible hone par trigger

document.querySelectorAll('.fade-in-left, .fade-in-right').forEach((el) => {
    observer.observe(el);
});

document.getElementById('current-year').textContent = new Date().getFullYear();

