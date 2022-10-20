package com.tasteshopping.review.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@Service
public class AwsS3Service {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String S3Bucket; // Bucket 이름

    public String uploadImgFile(MultipartFile multipartFile) throws IOException {
        // 이미지파일인지 확인은 프론트에서? 백에서? 얘기해볼것
        System.out.println("----------------3-----------------");
        String imagePath = "";
        if(multipartFile != null) {
            long size = multipartFile.getSize(); // 파일 크기 20MB제한

            //파일업로드이름변경
            String originalName = multipartFile.getOriginalFilename(); // 파일 이름
            int fileExtensionIndex = originalName.lastIndexOf(".");
            String fileExtension = originalName.substring(fileExtensionIndex);
            String fileName = originalName.substring(0, fileExtensionIndex);
            String now = String.valueOf(System.currentTimeMillis());
            String uploadName = fileName + "_" + String.valueOf(System.currentTimeMillis()) + fileExtension;

            System.out.println("uploadName : " + uploadName);
            System.out.println("size : " + size);

            ObjectMetadata objectMetaData = new ObjectMetadata();
            objectMetaData.setContentType(multipartFile.getContentType());
            objectMetaData.setContentLength(size);

            // S3에 업로드
                amazonS3Client.putObject(
                        new PutObjectRequest(S3Bucket, uploadName, multipartFile.getInputStream(), objectMetaData)
                                .withCannedAcl(CannedAccessControlList.PublicRead)
                );

            imagePath = amazonS3Client.getUrl(S3Bucket, uploadName).toString(); // 접근가능한 URL 가져오기
        }
        return imagePath;
    }
}
