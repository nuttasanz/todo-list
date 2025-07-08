### วิธีการรันโปรเจกต์

1. ติดตั้ง dependencies ด้วยคำสั่ง:
   npm install
   yarn install
   pnpm install
2. รันเซิร์ฟเวอร์สำหรับพัฒนา:
   npm run dev
   yarn dev
   pnpm dev
3. เปิดเบราว์เซอร์ที่ [http://localhost:3000](http://localhost:3000)

### เหตุผลในการเลือกใช้เทคนิคหรือเครื่องมือ

- **Next.js**: เป็น framework ที่นิยมมากในปัจจุบัน community ใหญ่
- **Redux**: จัดการ state ที่ซับซ้อนและแชร์ข้อมูลระหว่างหลาย component เมื่อ project ใหญ่ขึ้นจะจัดการได้ง่าย 
- **TypeScript**: เพิ่มความปลอดภัยด้วย static type checking
- **shadcn/ui**: ชุด UI component custom ง่าย ใช้ร่วมกับ tailwind ได้ดีและสวยงาม
- **Axios**: เรียก API ได้ง่ายและรองรับ Promise
- **โครงสร้างโฟลเดอร์**: แยกส่วนชัดเจน ดูแลและขยายโปรเจกต์ง่าย`