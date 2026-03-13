import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, User, Clock, MessageSquare, Calendar as CalendarIcon, Phone, Mail, Trash2, CheckCircle2 } from 'lucide-react';

interface Submission {
  id: number;
  submissionDate: string;
  appointmentDate: string;
  category: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  subject: string;
  status: 'new' | 'processed' | 'cancelled';
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    setSubmissions(data);
    
    // Set today as selected by default if there are appointments
    const todayStr = new Date().toISOString().split('T')[0];
    const hasToday = data.some((s: Submission) => s.appointmentDate === todayStr);
    if (hasToday) setSelectedDate(todayStr);
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today.toISOString().split('T')[0]);
  };

  const monthNames = [
    "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
    "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = (firstDayOfMonth(year, month) + 6) % 7; // Adjust for Monday start

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return submissions.filter(sub => sub.appointmentDate === dateStr);
  };

  const deleteSubmission = (id: number) => {
    const newData = submissions.filter(s => s.id !== id);
    localStorage.setItem('form_submissions', JSON.stringify(newData));
    setSubmissions(newData);
  };

  const toggleStatus = (id: number) => {
    const newData = submissions.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'new' ? ('processed' as const) : ('new' as const) };
      }
      return s;
    });
    localStorage.setItem('form_submissions', JSON.stringify(newData));
    setSubmissions(newData);
  };

  const selectedAppointments = selectedDate 
    ? submissions.filter(sub => sub.appointmentDate === selectedDate)
    : [];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2rem' }} className="grid-mobile-1">
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 800, color: 'white' }}>
              {monthNames[month]} {year}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
              Bu ay toplam {submissions.filter(s => {
                const d = new Date(s.appointmentDate);
                return d.getMonth() === month && d.getFullYear() === year;
              }).length} randevu planlandı.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={goToday} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.8rem', minWidth: 'auto' }}>Bugün</button>
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px' }}>
              <button onClick={prevMonth} className="btn-secondary" style={{ padding: '8px', minWidth: 'auto', background: 'transparent' }}><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="btn-secondary" style={{ padding: '8px', minWidth: 'auto', background: 'transparent' }}><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(d => (
            <div key={d} style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', paddingBottom: '10px' }}>{d}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
          {calendarDays.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} style={{ aspectRatio: '1', background: 'transparent' }} /> ;
            
            const appointments = getAppointmentsForDate(day);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const isToday = new Date().toISOString().split('T')[0] === dateStr;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                className="calendar-day-btn"
                style={{
                  aspectRatio: '1',
                  background: isSelected ? 'rgba(197, 160, 89, 0.15)' : isToday ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--primary)' : isToday ? 'rgba(197, 160, 89, 0.4)' : 'transparent',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: '5px'
                }}
              >
                <span style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 800, 
                  color: isSelected ? 'var(--primary)' : isToday ? 'var(--primary)' : 'rgba(255,255,255,0.9)',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                }}>{day}</span>
                
                {appointments.length > 0 && (
                  <div style={{ 
                    marginTop: '6px', 
                    display: 'flex', 
                    gap: '3px',
                    justifyContent: 'center',
                    width: '100%'
                  }}>
                    {appointments.slice(0, 3).map((sub, i) => (
                      <div key={i} style={{ 
                        width: '5px', 
                        height: '5px', 
                        borderRadius: '50%', 
                        background: sub.status === 'new' ? 'var(--primary)' : 'rgba(255,255,255,0.3)' 
                      }} title={sub.name} />
                    ))}
                    {appointments.length > 3 && <span style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: 800 }}>+</span>}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: 0, fontWeight: 800 }}>
            {selectedDate ? `${new Date(selectedDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}` : "Gün Özeti"}
          </h4>
          {selectedAppointments.length > 0 && (
            <span style={{ background: 'rgba(197, 160, 89, 0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
              {selectedAppointments.length} Randevu
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '600px', paddingRight: '5px' }} className="custom-scrollbar">
          <AnimatePresence mode="popLayout">
            {selectedDate ? (
              selectedAppointments.length > 0 ? (
                selectedAppointments.map((app) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={app.id}
                    style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      padding: '1.25rem', 
                      borderRadius: '18px', 
                      border: '1px solid var(--border)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => toggleStatus(app.id)}
                        style={{ background: 'transparent', border: 'none', color: app.status === 'new' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title={app.status === 'new' ? "Mark as Processed" : "Mark as New"}
                      >
                        {app.status === 'new' ? <Clock size={16} /> : <CheckCircle2 size={16} />}
                      </button>
                      <button 
                        onClick={() => deleteSubmission(app.id)}
                        style={{ background: 'transparent', border: 'none', color: 'rgba(255,77,77,0.6)', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', background: 'var(--bg-dark)', borderRadius: '12px', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} />
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: '1rem', margin: 0, color: 'white' }}>{app.name} {app.surname}</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, margin: '2px 0 0' }}>{app.category}</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <Phone size={14} /> {app.phone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                        <Mail size={14} /> {app.email.split('@')[0]}...
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-dark)', padding: '10px 12px', borderRadius: '12px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                      <MessageSquare size={12} style={{ marginBottom: '4px', display: 'block', color: 'var(--primary)' }} />
                      {app.subject}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {app.submissionDate?.split(' ')[1] || '09:00'}
                      </div>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        textTransform: 'uppercase', 
                        letterSpacing: '1px', 
                        fontWeight: 800,
                        color: app.status === 'new' ? 'var(--primary)' : 'var(--text-muted)'
                      }}>
                        {app.status === 'new' ? 'YENİ TALEP' : 'İŞLENDİ'}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ textAlign: 'center', padding: '4rem 1rem', background: 'rgba(255,255,255,0.01)', borderRadius: '20px', border: '2px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}
                >
                  <CalendarIcon size={40} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                  <p>Bu tarihte bekleyen veya planlanan<br/>bir randevu bulunmuyor.</p>
                </motion.div>
              )
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '4rem 1rem', background: 'rgba(255,255,255,0.01)', borderRadius: '20px', border: '2px dashed var(--border)', color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                <CalendarIcon size={40} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                <p>Detayları görmek için takvimden<br/>bir gün seçin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, var(--primary) 0%, #b38d4a 100%)', 
          color: 'var(--bg-dark)', 
          padding: '1.75rem', 
          borderRadius: '24px', 
          position: 'relative', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(197, 160, 89, 0.2)'
        }}>
          <CalendarIcon size={120} style={{ position: 'absolute', right: '-30px', bottom: '-30px', opacity: 0.15 }} />
          <h5 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>Yıllık Özet</h5>
          <p style={{ fontSize: '3rem', fontWeight: 900, margin: 0, lineHeight: 1 }}>{submissions.length}</p>
          <p style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.9, marginTop: '8px' }}>2026 Toplam Talep</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
