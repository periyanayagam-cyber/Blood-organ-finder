
const form = document.getElementById('donorForm');
const donorList = document.getElementById('donorList');
const search = document.getElementById('search');

let donors = JSON.parse(localStorage.getItem('donors')) || [];

function displayDonors(filter = '') {
  donorList.innerHTML = '';

  const filteredDonors = donors.filter(d =>
    d.bloodGroup.toLowerCase().includes(filter.toLowerCase()) ||
    d.location.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredDonors.length === 0) {
    donorList.innerHTML = '<p>No matching donors found.</p>';
    return;
  }

  filteredDonors.forEach((d, i) => {
    const div = document.createElement('div');
    div.classList.add('donor');
    div.innerHTML = `
      <p><strong>${d.name}</strong> (${d.bloodGroup})</p>
      <p>Organ: ${d.organ || 'N/A'}</p>
      <p>Location: ${d.location}</p>
      <p>📞 Phone: <a href="tel:${d.phone}">${d.phone}</a></p>
      <button onclick="deleteDonor(${i})">Delete</button>
    `;
    donorList.appendChild(div);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const donor = {
    name: form.name.value,
    bloodGroup: form.bloodGroup.value,
    organ: form.organ.value,
    location: form.location.value,
    phone: form.phone.value
  };
  donors.push(donor);
  localStorage.setItem('donors', JSON.stringify(donors));
  form.reset();
  displayDonors();
});

function deleteDonor(index) {
  donors.splice(index, 1);
  localStorage.setItem('donors', JSON.stringify(donors));
  displayDonors();
}

search.addEventListener('input', e => displayDonors(e.target.value));

displayDonors();



