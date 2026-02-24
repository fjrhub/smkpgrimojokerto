import React from 'react';

const styles = {
  section: {
    padding: '5rem 2rem',
    maxWidth: '1200px',
    margin: 'auto'
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '3rem'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '2rem',
    position: 'relative',
    transition: 'transform 0.3s ease'
  },
  cardHover: {
    transform: 'translateY(-5px)'
  },
  quoteIcon: {
    fontSize: '3rem',
    color: '#3498db',
    position: 'absolute',
    top: '1rem',
    right: '1.5rem',
    opacity: 0.2
  },
  text: {
    fontStyle: 'italic',
    marginTop: '2rem',
    lineHeight: '1.6',
    color: '#34495e'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  meta: {
    marginTop: '1.5rem',
    textAlign: 'center'
  },
  name: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50'
  },
  roleYear: {
    fontSize: '0.9rem',
    color: '#7f8c8d'
  }
};

const TestimonialCard = ({ name, role, year, message, avatar }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.avatarContainer}>
        <img src={avatar.trim()} alt={name} style={styles.avatar} />
      </div>
      <div style={styles.quoteIcon}>❝</div>
      <p style={styles.text}>{message}</p>
      <div style={styles.meta}>
        <h4 style={styles.name}>{name}</h4>
        <span style={styles.roleYear}>
          {role} | Lulusan {year}
        </span>
      </div>
    </div>
  );
};

// Accept id as a prop
const Testimonials = ({ id }) => {
  const testimonials = [
    {
      id: 1,
      name: "Muhammad Yusuf Habibie",
      role: "Teknisi NOC di PT. Mega Artha Lintas Data",
      year: 2023,
      message: "Ilmu dari SMK PGRI sangat berguna di dunia kerja. Terima kasih atas fondasi yang kuat!",
      avatar: "testimoni1.png"
    },
    {
      id: 2,
      name: "Wahyu Tri Wibowo",
      role: "Replace & IB di PT. Anugrah Terang Persada",
      year: 2025,
      message: "Pendidikan di SMK PGRI memberikan saya landasan yang kokoh untuk melanjutkan studi ke perguruan tinggi.",
      avatar: "testimoni2.png"
    },
    {
      id: 3,
      name: "Aditya Putra Pratama",
      role: "Lomba Tingkat JaTim Atswa Network & Sysadmin Skill Competition Bidang Simulator",
      year: 2024,
      message: "Lingkungan belajar yang mendukung dan guru yang kompeten membuat saya percaya diri menghadapi dunia kerja.",
      avatar: "testimoni3.png"
    }
  ];

  return (
    <section 
      id={id} 
      className="scroll-mt-20" 
      style={styles.section}
    >
      <h2 style={styles.title}>Testimoni Alumni</h2>
      <div style={styles.grid}>
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} {...t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;