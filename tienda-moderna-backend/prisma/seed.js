import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123456', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@tiendamoderna.com' },
    update: {},
    create: {
      email: 'admin@tiendamoderna.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'SUPER_ADMIN',
      emailVerified: true,
      isActive: true
    }
  });

  console.log('✅ Admin user created');

  // Create test customer
  const customerPassword = await bcrypt.hash('customer123', 12);
  
  const testCustomer = await prisma.user.upsert({
    where: { email: 'customer@test.com' },
    update: {},
    create: {
      email: 'customer@test.com',
      password: customerPassword,
      firstName: 'Test',
      lastName: 'Customer',
      role: 'CUSTOMER',
      emailVerified: true,
      isActive: true
    }
  });

  console.log('✅ Test customer created');

  // Create brands
  const brands = [
    { name: 'Fabuloso', slug: 'fabuloso', description: 'Productos de limpieza multiusos' },
    { name: 'Clorox', slug: 'clorox', description: 'Desinfectantes y blanqueadores' },
    { name: 'Mr. Clean', slug: 'mr-clean', description: 'Limpiadores profesionales' },
    { name: 'Lysol', slug: 'lysol', description: 'Desinfectantes antibacteriales' },
    { name: 'Ajax', slug: 'ajax', description: 'Limpiadores abrasivos' },
    { name: 'Tide', slug: 'tide', description: 'Detergentes para ropa' },
    { name: 'Downy', slug: 'downy', description: 'Suavizantes de telas' },
    { name: 'Scotch-Brite', slug: 'scotch-brite', description: 'Esponjas y fibras' }
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand
    });
  }

  console.log('✅ Brands created');

  // Create categories
  const categories = [
    { name: 'Limpiadores Multiusos', slug: 'limpiadores-multiusos', description: 'Productos para limpieza general' },
    { name: 'Desinfectantes', slug: 'desinfectantes', description: 'Productos antibacteriales y desinfectantes' },
    { name: 'Detergentes', slug: 'detergentes', description: 'Productos para lavado de ropa' },
    { name: 'Limpiadores de Piso', slug: 'limpiadores-de-piso', description: 'Productos especializados para pisos' },
    { name: 'Limpiadores de Baño', slug: 'limpiadores-de-bano', description: 'Productos para limpieza de baños' },
    { name: 'Limpiadores de Cocina', slug: 'limpiadores-de-cocina', description: 'Productos para limpieza de cocinas' },
    { name: 'Accesorios de Limpieza', slug: 'accesorios-de-limpieza', description: 'Esponjas, trapos y accesorios' },
    { name: 'Cuidado Personal', slug: 'cuidado-personal', description: 'Productos de higiene personal' }
  ];

  const createdCategories = {};
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
    createdCategories[category.slug] = created;
  }

  console.log('✅ Categories created');

  // Get created brands
  const createdBrands = {};
  for (const brand of brands) {
    const found = await prisma.brand.findUnique({ where: { slug: brand.slug } });
    createdBrands[brand.slug] = found;
  }

  // Create products
  const products = [
    {
      name: 'Fabuloso Limpiador Multiusos Lavanda',
      slug: 'fabuloso-limpiador-multiusos-lavanda',
      description: 'Limpiador multiusos con fragancia a lavanda que deja tus superficies limpias y con un aroma fresco.',
      shortDescription: 'Limpiador multiusos con fragancia a lavanda',
      sku: 'FAB-LAV-500',
      price: 8500,
      comparePrice: 10000,
      quantity: 100,
      categoryId: createdCategories['limpiadores-multiusos'].id,
      brandId: createdBrands['fabuloso'].id,
      isFeatured: true,
      status: 'ACTIVE'
    },
    {
      name: 'Clorox Desinfectante Original',
      slug: 'clorox-desinfectante-original',
      description: 'Desinfectante que elimina 99.9% de gérmenes y bacterias. Ideal para superficies del hogar.',
      shortDescription: 'Desinfectante que elimina 99.9% de gérmenes',
      sku: 'CLX-DES-1000',
      price: 12000,
      quantity: 75,
      categoryId: createdCategories['desinfectantes'].id,
      brandId: createdBrands['clorox'].id,
      isFeatured: true,
      status: 'ACTIVE'
    },
    {
      name: 'Tide Detergente en Polvo Original',
      slug: 'tide-detergente-polvo-original',
      description: 'Detergente en polvo de alta eficiencia que remueve las manchas más difíciles.',
      shortDescription: 'Detergente en polvo de alta eficiencia',
      sku: 'TID-POL-2000',
      price: 25000,
      comparePrice: 28000,
      quantity: 50,
      categoryId: createdCategories['detergentes'].id,
      brandId: createdBrands['tide'].id,
      status: 'ACTIVE'
    },
    {
      name: 'Mr. Clean Limpiador de Pisos',
      slug: 'mr-clean-limpiador-pisos',
      description: 'Limpiador especializado para todo tipo de pisos. Deja un brillo duradero.',
      shortDescription: 'Limpiador especializado para pisos',
      sku: 'MRC-PIS-750',
      price: 15000,
      quantity: 80,
      categoryId: createdCategories['limpiadores-de-piso'].id,
      brandId: createdBrands['mr-clean'].id,
      status: 'ACTIVE'
    },
    {
      name: 'Lysol Desinfectante en Aerosol',
      slug: 'lysol-desinfectante-aerosol',
      description: 'Desinfectante en aerosol que elimina virus y bacterias en superficies.',
      shortDescription: 'Desinfectante en aerosol antibacterial',
      sku: 'LYS-AER-400',
      price: 18000,
      quantity: 60,
      categoryId: createdCategories['desinfectantes'].id,
      brandId: createdBrands['lysol'].id,
      isFeatured: true,
      status: 'ACTIVE'
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        images: {
          create: [
            {
              url: `/images/products/${product.slug}-1.jpg`,
              alt: product.name,
              sortOrder: 0
            }
          ]
        },
        attributes: {
          create: [
            { name: 'Tamaño', value: '500ml' },
            { name: 'Tipo', value: 'Líquido' },
            { name: 'Fragancia', value: 'Original' }
          ]
        }
      }
    });
  }

  console.log('✅ Products created');

  // Create sample address for test customer
  await prisma.address.create({
    data: {
      userId: testCustomer.id,
      type: 'SHIPPING',
      firstName: 'Test',
      lastName: 'Customer',
      address1: 'Calle 123 #45-67',
      city: 'Bogotá',
      state: 'Cundinamarca',
      postalCode: '110111',
      country: 'Colombia',
      phone: '+57 300 123 4567',
      isDefault: true
    }
  });

  console.log('✅ Sample address created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
