-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "author_id" TEXT NOT NULL,
    "question_id" TEXT,
    "answer_id" TEXT,
    CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "comments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "attachments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "question_id" TEXT,
    "answer_id" TEXT,
    CONSTRAINT "attachments_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "attachments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
