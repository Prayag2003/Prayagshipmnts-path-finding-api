provider "aws" {
  region = "ap-south-1"  
}

resource "aws_instance" "example" {
  ami           = "{{AMAZON_LINUX_AMI}}"  
  instance_type = "t2.micro"  

  tags = {
    Name = "ExampleInstance"
  }

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              systemctl start nginx
              systemctl enable nginx
              EOF
}

resource "aws_security_group" "instance_sg" {
  name_prefix = "example-sg"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "example-sg"
  }
}

resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1f0" ID
  instance_type = "t2.micro"
  security_groups = [
    aws_security_group.instance_sg.name,
  ]

  tags = {
    Name = "ExampleInstance"
  }
}
