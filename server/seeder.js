import Service from './models/Service.js';
import User from './models/User.js';

export const seedDefaultData = async () => {
  try {
    const allServices = [
      // Hair Care & Styling
      {
        name: 'Royal Hair Styling & Precision Cut',
        description: 'Custom precision haircut, revitalizing hair wash, scalp acupressure massage, and blowout styling.',
        price: 45,
        durationMinutes: 45,
        category: 'Hair',
        isActive: true
      },
      {
        name: 'Balayage & Ombre Color Melt',
        description: 'Hand-painted dimensional highlighting with luxury toner gloss, bond protector, and style finish.',
        price: 135,
        durationMinutes: 120,
        category: 'Hair',
        isActive: true
      },
      {
        name: 'Keratin Hair Smoothing & Botox',
        description: 'Advanced restorative protein treatment to eliminate frizz, restore moisture, and leave hair silk-soft.',
        price: 125,
        durationMinutes: 120,
        category: 'Hair',
        isActive: true
      },
      {
        name: 'Moroccan Argan Oil Deep Hair Spa',
        description: 'Intense steam infusion with Moroccan argan mask, split-end repair serum, and relaxing shoulder massage.',
        price: 65,
        durationMinutes: 60,
        category: 'Hair',
        isActive: true
      },

      // Skincare & Advanced Facials
      {
        name: 'Luxury 24K Gold Radiance Facial',
        description: 'Pure 24-karat gold leaf mask, deep ultrasonic pore cleansing, anti-aging serum, and cooling jade roller therapy.',
        price: 90,
        durationMinutes: 60,
        category: 'Skincare',
        isActive: true
      },
      {
        name: 'Hydra-Dermabrasion Deep Cleansing',
        description: 'Non-invasive vortex extraction, hyaluronic acid peptide infusion, and oxygen spray hydration.',
        price: 95,
        durationMinutes: 60,
        category: 'Skincare',
        isActive: true
      },
      {
        name: 'Clarifying Acne & LED Blue Light Facial',
        description: 'Salicylic purification peel, manual blackhead extraction, antimicrobial botanical mask, and LED phototherapy.',
        price: 70,
        durationMinutes: 50,
        category: 'Skincare',
        isActive: true
      },
      {
        name: 'Anti-Aging Collagen Peptide Lift',
        description: 'Microcurrent skin tightening, bio-collagen mask, and firming neck & décolleté lymphatic contouring.',
        price: 110,
        durationMinutes: 75,
        category: 'Skincare',
        isActive: true
      },

      // Makeup & Bridal Artistry
      {
        name: 'Signature Bridal HD Royal Makeup',
        description: 'Full bridal makeover with waterproof HD foundation, 3D mink lashes, hair crown styling, and jewelry/veil setting.',
        price: 185,
        durationMinutes: 120,
        category: 'Makeup',
        isActive: true
      },
      {
        name: 'Red Carpet Glam Party Makeup',
        description: 'Stunning evening glam with sculpted contouring, smokey eye or shimmer shadow, lashes, and lip styling.',
        price: 85,
        durationMinutes: 60,
        category: 'Makeup',
        isActive: true
      },
      {
        name: 'Airbrush Engagement & Reception Makeup',
        description: 'Ultra-lightweight 16-hour silicone airbrush makeup, dewy glass-skin finish, and hair updos.',
        price: 130,
        durationMinutes: 90,
        category: 'Makeup',
        isActive: true
      },

      // Spa & Full Body Wellness
      {
        name: 'Swedish Aromatherapy Full Body Massage',
        description: 'Soothing long strokes, warmed lavender & eucalyptus essential oils, and hot towel tension release.',
        price: 90,
        durationMinutes: 60,
        category: 'Spa',
        isActive: true
      },
      {
        name: 'Hot Stone Deep Tissue Therapy',
        description: 'Heated volcanic basalt stones combined with focused acupressure to dissolve deep chronic muscular tension.',
        price: 115,
        durationMinutes: 75,
        category: 'Spa',
        isActive: true
      },
      {
        name: 'Dead Sea Salt Body Scrub & Polish',
        description: 'Full-body mineral exfoliation, detoxifying mud wrap, and rich shea butter hydration massage.',
        price: 80,
        durationMinutes: 60,
        category: 'Spa',
        isActive: true
      },

      // Nails & Hands/Feet Care
      {
        name: 'Deluxe Crystal Manicure & Pedicure',
        description: 'Herbal foot soak, cuticle refinement, sea salt scrub, hot stone foot massage, and long-lasting gel polish.',
        price: 60,
        durationMinutes: 60,
        category: 'Nails',
        isActive: true
      },
      {
        name: 'Acrylic Extensions & Custom Nail Art',
        description: 'Full set acrylic or gel sculpted nail extensions with ombre, chrome, glitter, or custom hand-painted nail art.',
        price: 75,
        durationMinutes: 75,
        category: 'Nails',
        isActive: true
      },

      // Waxing & Brows
      {
        name: 'Full Body Organic Rica Waxing',
        description: 'Gentle, painless Italian colophony-free Rica wax treatment leaving skin silky, calm, and hair-free.',
        price: 85,
        durationMinutes: 60,
        category: 'Waxing',
        isActive: true
      },
      {
        name: 'Eyebrow Threading & Lash Keratin Lift',
        description: 'Precise brow mapping & threading paired with a natural lash tint and keratin curl lift lasting 6-8 weeks.',
        price: 55,
        durationMinutes: 45,
        category: 'Waxing',
        isActive: true
      }
    ];

    console.log(`🌱 Synchronizing ${allServices.length} salon services...`);
    for (const service of allServices) {
      await Service.findOneAndUpdate(
        { name: service.name },
        service,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log(`✅ All ${allServices.length} salon services synchronized in database!`);

    const beauticians = [
      {
        name: 'Sophia Martinez',
        email: 'sophia@luxe.com',
        password: 'password123',
        role: 'beautician',
        phone: '+1 555-0101',
        specialization: 'Senior Hair Stylist & Colorist',
        experienceYears: 7
      },
      {
        name: 'Emily Clark',
        email: 'emily@luxe.com',
        password: 'password123',
        role: 'beautician',
        phone: '+1 555-0102',
        specialization: 'Aesthetician & Skincare Specialist',
        experienceYears: 5
      },
      {
        name: 'Priya Sharma',
        email: 'priya@luxe.com',
        password: 'password123',
        role: 'beautician',
        phone: '+1 555-0103',
        specialization: 'Bridal & Red-Carpet Makeup Artist',
        experienceYears: 9
      },
      {
        name: 'Jessica Lee',
        email: 'jessica@luxe.com',
        password: 'password123',
        role: 'beautician',
        phone: '+1 555-0104',
        specialization: 'Master Nail Artist & Lash Specialist',
        experienceYears: 4
      },
      {
        name: 'Chloe Bennett',
        email: 'chloe@luxe.com',
        password: 'password123',
        role: 'beautician',
        phone: '+1 555-0105',
        specialization: 'Holistic Spa & Deep Tissue Therapist',
        experienceYears: 6
      }
    ];

    for (const b of beauticians) {
      const existing = await User.findOne({ email: b.email });
      if (!existing) {
        await User.create(b);
      }
    }
    console.log('✅ Staff beauticians synchronized!');

    const existingAdmin = await User.findOne({ email: 'admin@luxe.com' });
    if (!existingAdmin) {
      await User.create({
        name: 'Salon Administrator',
        email: 'admin@luxe.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1 555-0001'
      });
      console.log('✅ Admin user created: admin@luxe.com (password: admin123)');
    }
  } catch (error) {
    console.error('❌ Error seeding default data:', error.message);
  }
};
