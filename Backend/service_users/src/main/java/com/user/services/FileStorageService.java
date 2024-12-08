package com.user.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Value;

@Service
public class FileStorageService {

    @Value("${file.upload-dir:C:/uploads}")  // Change this to a valid directory
    private String uploadDir;

    public String saveFile(MultipartFile file) throws IOException {
        // Ensure the directory exists
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique file name (you can customize this as needed)
        String uniqueFileName = file.getOriginalFilename(); // You can add a UUID if needed

        // Save the file
        Path filePath = uploadPath.resolve(uniqueFileName);
        file.transferTo(filePath.toFile());

        return filePath.toString();  // Return the path of the saved file
    }
}
