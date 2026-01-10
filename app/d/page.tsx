'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const sponsors = [
    { name: 'Lenovo', image: '/images/sponsors/lenovo.png' },
    { name: 'Alibaba Store', image: '/images/sponsors/alibaba.png' },
    { name: 'Sevima', image: '/images/sponsors/sevima.png' },
    { name: 'Merkle Innovation', image: '/images/sponsors/merkle.png' },
    { name: 'Jagoan Hosting', image: '/images/sponsors/jagoan.png' },
    { name: 'Livin Mandiri', image: '/images/sponsors/livin.png' },
    { name: 'Boxhill', image: '/images/sponsors/boxhill.png' },
    { name: 'Globalxtreme', image: '/images/sponsors/globalxtreme.png' },
    { name: 'Fortinet', image: '/images/sponsors/fortinet.png' },
    { name: 'ITC', image: '/images/sponsors/itc.png' },
  ]

  return (
    <div className="warpper clearfix">
      <div className="warpper-inner">
        {/* Header */}
        <header className="navbar-header header-page">
          <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
              <Link href="/" className="navbar-brand">
                <span>SMK Telkom Malang</span>
              </Link>
              <button className="navbar-toggler" type="button">
                <span className="navbar-toggler-icon">☰</span>
              </button>
              <div className="navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <Link href="#" className="dropdown-toggle">Beranda</Link>
                    <div className="dropdown-menu">
                      <Link href="/#sambutan" className="dropdown-item">Sambutan Kepala Sekolah</Link>
                      <Link href="/#video-profile-sekolah" className="dropdown-item">Video Profil Sekolah</Link>
                      <Link href="/berita" className="dropdown-item">Berita Terbaru</Link>
                      <Link href="/agenda" className="dropdown-item">Agenda Sekolah</Link>
                      <Link href="/galeri" className="dropdown-item">Galeri Sekolah</Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href="#" className="dropdown-toggle">Tentang Kami</Link>
                    <div className="dropdown-menu">
                      <Link href="/p/profil-sekolah" className="dropdown-item">Profil Sekolah</Link>
                      <Link href="/p/visi-dan-misi" className="dropdown-item">Visi & Misi</Link>
                      <Link href="/p/struktur-organisasi" className="dropdown-item">Struktur Organisasi</Link>
                      <Link href="/p/akreditasi" className="dropdown-item">Akreditasi</Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href="#program" className="dropdown-toggle">Program</Link>
                    <div className="dropdown-menu">
                      <Link href="/p/profil-jurusan" className="dropdown-item">Profil Jurusan</Link>
                      <Link href="/p/ekstrakurikuler" className="dropdown-item">Ekstrakurikuler</Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href="#alumni" className="dropdown-toggle">Alumni</Link>
                    <div className="dropdown-menu">
                      <Link href="/#testmonials" className="dropdown-item">Testimoni Alumni</Link>
                      <Link href="/p/profil-alumni" className="dropdown-item">Profil Alumni</Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link href="#contact" className="dropdown-toggle">Hubungi Kami</Link>
                    <div className="dropdown-menu">
                      <Link href="/faq" className="dropdown-item">FAQs</Link>
                      <Link href="/pertanyaan" className="dropdown-item">Kotak Pertanyaan</Link>
                      <Link href="/p/pusat-bantuan" className="dropdown-item">Pusat Bantuan</Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link href="/ppdb">PPDB</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/mikrotik-academy">MikroTik Academy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {/* Page Title Section */}
        <div className="section-title portflio-section-title bg-blog-section padd-title">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-12">
                <div className="text-center">
                  <h2 className="title-h2">Profil Sekolah</h2>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Beranda</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="#">Profil Sekolah</Link>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <section className="pd-bt-60 pd-tp-100 content-portfolio">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h2>Profil Sekolah</h2>
              </div>
              <div className="col-md-6">
                <div className="share-project">
                  <span>Bagikan</span>
                  <ul>
                    <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                    <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                    <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="img-portfolio">
                  <Image 
                    src="/images/single-p.jpg" 
                    alt="SMK Telkom Malang"
                    width={1200}
                    height={600}
                    priority
                  />
                </div>

                <div className="description-portfolio">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        SMK Telkom Malang adalah pelopor Sekolah menengah kejuruan pertama di Indonesia di bidang Teknologi dan Informatika. 
                        Berpengalaman dari tahun 1992 yang telah terakreditasi <strong>"A"</strong> dan mempunyai standart mutu <strong>ISO 9001:2015.</strong> 
                        SMK Telkom Malang juga merupakan sekolah adiwiyata yang menerapkan prinsip sekolah hijau, hal tersebut semakin memberikan suasana yang nyaman bagi warga sekolah.
                      </p>

                      <div className="badges">
                        <Image 
                          src="/images/logo-adiwiyata.png" 
                          alt="Adiwiyata" 
                          width={100} 
                          height={102}
                        />
                        <Image 
                          src="/images/iso2015.png" 
                          alt="ISO 2015" 
                          width={200} 
                          height={77}
                        />
                      </div>

                      <p>
                        Manajemen SMK Telkom malang berkomitmen untuk memberikan pelayanan jasa pendidikan yang bermutu tinggi dengan menggunakan 
                        Sistem Manajemen Mutu ISO 9001:2015 SMK dengan melibatkan seluruh komponen sekolah yang ada dengan mengembangkan kepribadian 
                        yang memiliki jiwa <strong>MOKLET</strong>.
                      </p>

                      <div className="moklet-values">
                        <p><strong>M : Mulia</strong><br />Membangun karakter generasi yang beriman, bertaqwa, dan berakhlak mulia</p>
                        <p><strong>O: Obyektif</strong><br />Mewujudkan insan yang mampu berpikir ilmiah, jujur, dan kompetitif</p>
                        <p><strong>K : Kreatif</strong><br />Menciptakan pembelajaran inovatif berbasis teknologi yang mendorong siswa memiliki kompetensi abad 21</p>
                        <p><strong>L : Loyalitas</strong><br />Menumbuhkan semangat mengabdi dan rasa memiliki sehingga dapat meningkatkan etos kerja</p>
                        <p><strong>E : Empati</strong><br />Mewujudkan budaya sekolah yang saling menghargai dan peduli sehingga menciptakan suasana nyaman di lingkungan sekolah</p>
                        <p><strong>T : Terampil</strong><br />Menghasilkan lulusan yang cakap di bidang Teknologi Informasi dan Komunikasi serta unggul dalam menghadapi persaingan global</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="pd-bt-30">
          <div className="container">
            <div className="row">
              <div className="client-slider text-center col-12 col-md-12">
                <div className="sponsor-grid">
                  {sponsors.map((sponsor, index) => (
                    <div key={index} className="sponsor-item">
                      <div className="client-item-img">
                        <Image 
                          src={sponsor.image} 
                          alt={sponsor.name} 
                          title={sponsor.name}
                          width={150}
                          height={80}
                          className="img-responsive"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-warpper">
            <div className="footer-top">
              <div className="container">
                <div className="clearfix">
                  <div className="footer-bottom-content clearfix">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <Image 
                          src="/images/footer.svg" 
                          alt="SMK Telkom Malang Logo" 
                          width={200} 
                          height={60}
                        />
                      </div>

                      <div className="col-12 col-md-5">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="list-menu-block pd-lf-30">
                              <h5>Menu Utama</h5>
                              <ul className="list-menu">
                                <li><Link href="/">Beranda</Link></li>
                                <li><Link href="/p/profil-sekolah">Tentang Kami</Link></li>
                                <li><Link href="/p/profil-jurusan">Profil Jurusan</Link></li>
                                <li><Link href="/ppdb">PPDB</Link></li>
                              </ul>
                            </div>

                            <div className="list-menu-block pd-lf-30">
                              <h5>Hubungi Kami</h5>
                              <ul className="list-menu">
                                <li><Link href="/faq">FAQ</Link></li>
                                <li><Link href="/layanan-orang-tua">Layanan Orang Tua</Link></li>
                                <li><Link href="/pertanyaan">Kotak Pertanyaan</Link></li>
                                <li><Link href="/p/pusat-bantuan">Pusat Bantuan</Link></li>
                              </ul>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="list-menu-block">
                              <h5>Aplikasi Siswa</h5>
                              <ul className="list-menu">
                                <li><Link href="/mylms" target="_blank">MyLMS</Link></li>
                                <li><Link href="/siakad" target="_blank">Siakad</Link></li>
                                <li><Link href="/buku-induk" target="_blank">Buku Induk</Link></li>
                                <li><Link href="/ujian" target="_blank">Ujian Online</Link></li>
                              </ul>
                            </div>

                            <div className="list-menu-block">
                              <h5>Useful Links</h5>
                              <ul className="list-menu">
                                <li><Link href="/igracias" target="_blank">iGracias TS</Link></li>
                                <li><Link href="/ypt" target="_blank">YPT</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-3">
                        <div className="row">
                          <div className="subscribe-block">
                            <span>Statistik</span>
                            <p>Website Moklet</p>
                            <div className="list-menu-block">
                              <ul className="list-menu">
                                <li><Link href="#">📊 Pageview Hari Ini: 1136</Link></li>
                                <li><Link href="#">👥 Visitor Hari Ini: 1035</Link></li>
                                <li><Link href="#">📅 Visitor Bulan Ini: 15356</Link></li>
                                <li><Link href="#">🌍 Total Visitor: 82081</Link></li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <h5>Alamat:</h5>
                          <p>Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="copyright">
                <p>2026 © Copyright Moklet All rights Reserved.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* WhatsApp Floating Button */}
        <button 
          className="kc_fab_main_btn" 
          onClick={() => window.open('https://api.whatsapp.com/send?phone=6281223488999', '_blank')}
        >
          <span>💬</span>
        </button>
      </div>
    </div>
  )
}
