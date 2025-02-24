import face_recognition
import cv2
import os
import numpy as np

# Path folder database wajah
DATABASE_PATH = "database/"

# Fungsi untuk memuat database wajah
def load_face_database(database_path):
    known_face_encodings = []
    known_face_names = []

    for file in os.listdir(database_path):
        if file.endswith(".jpg") or file.endswith(".png"):
            # Muat gambar
            image_path = os.path.join(database_path, file)
            image = face_recognition.load_image_file(image_path)
            face_encoding = face_recognition.face_encodings(image)[0]  # Asumsikan 1 wajah per gambar
            
            # Simpan encoding dan nama
            known_face_encodings.append(face_encoding)
            known_face_names.append(os.path.splitext(file)[0])  # Ambil nama dari file

    return known_face_encodings, known_face_names

# Fungsi utama untuk autentikasi wajah
def recognize_face_from_camera(known_face_encodings, known_face_names):
    # Inisialisasi webcam
    video_capture = cv2.VideoCapture(0)

    print("Tekan 'q' untuk keluar dari aplikasi...")

    while True:
        # Ambil frame dari webcam
        ret, frame = video_capture.read()
        if not ret:
            break

        # Ubah warna ke RGB untuk face_recognition
        rgb_frame = frame[:, :, ::-1]

        # Deteksi lokasi wajah dan encoding wajah di frame
        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

        for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
            # Cocokkan wajah yang terdeteksi dengan database
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

            name = "Unknown"

            if True in matches:
                # Pilih wajah dengan jarak terdekat
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

            # Gambar kotak di sekitar wajah
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)

            # Tampilkan nama di bawah kotak
            cv2.putText(frame, name, (left, bottom + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

        # Tampilkan frame dengan wajah yang dikenali
        cv2.imshow('Face Recognition', frame)

        # Tekan 'q' untuk keluar
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Tutup webcam dan window
    video_capture.release()
    cv2.destroyAllWindows()

# Main program
if __name__ == "__main__":
    print("Memuat database wajah...")
    known_face_encodings, known_face_names = load_face_database(DATABASE_PATH)
    print("Database wajah berhasil dimuat!")

    print("Memulai face recognition...")
    recognize_face_from_camera(known_face_encodings, known_face_names)
